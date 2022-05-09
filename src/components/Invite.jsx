import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as Linked, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Invite() {
  const navigate = useNavigate();
  const [token, setToken] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/user/token", data)
      .then((response) => {
        setToken(response.data);
      })
      .catch((err) => {
        Swal.fire({icon: "error", text : err.response.data, confirmButtonColor: "#48BB78"});
        setToken({});
        reset();
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Formulario de invitación</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Invita a tus amigos y ambos recibirán $5000 CLP
          </Text>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack align={"center"}>
            <img src="https://getonbrd-prod.s3.amazonaws.com/uploads/users/logo/5695/logo-SII2.jpg" alt="bird"></img>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errors.email}>
                <Input
                  focusBorderColor="disable"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Campo requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="name" isInvalid={errors.name}>
                <Input
                  focusBorderColor="disable"
                  placeholder="Nombre completo"
                  {...register("name", {
                    required: "Campo requerido",
                    pattern: {
                      value: /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
                      message: "Nombre inválido",
                    },
                  })}
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>

              <Stack spacing={10}>
                <Button
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "green.500",
                  }}
                  type="submit"
                >
                  Compartir
                </Button>
              </Stack>
            </Stack>
          </form>
          {token.token && (
            <Stack pt={6}>
              <Text
                textAlign={["center"]}
                fontSize={["xs", "sm", "md", "lg", "xl"]}
              >
                localhost:3000/register/invite/{token.token}
              </Text>
            </Stack>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}

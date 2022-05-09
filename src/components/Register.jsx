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
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link as Linked, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/user/register", { ...data, token: token })
      .then((user) => {
        Swal.fire({
          icon: "success",
          text: `¡Bienvenido ${data.name}, ya puedes comenzar a invitar amigos!
          Recuerda que los links de invitación son válidos solo una vez`,
          confirmButtonColor: "#48BB78",
        });
        navigate("/invite");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response.data,
          confirmButtonColor: "#48BB78",
        });
        reset();
        if (err.response.status === 401) {
          navigate("/register");
        }
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Formulario de registro</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Regístrate para comenzar a{" "}
            <Linked to="/invite">
              <span style={{ color: "green" }}>invitar</span>{" "}
            </Linked>
            amigos
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack align={"center"}>
            <img
              src="https://getonbrd-prod.s3.amazonaws.com/uploads/users/logo/5695/logo-SII2.jpg"
              alt="bird"
            ></img>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
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
              <FormControl id="address" isInvalid={errors.address}>
                <Input
                  focusBorderColor="disable"
                  placeholder="Dirección"
                  {...register("address", {
                    required: "Campo requerido",
                    pattern: {
                      value: /^[a-zA-Z0-9\s,.'-]{3,}$/i,
                      message: "Dirección inválida",
                    },
                  })}
                />
                {errors.address && (
                  <FormErrorMessage>{errors.address.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="gender" isInvalid={errors.gender}>
                <Select
                  focusBorderColor="disable"
                  placeholder="Sexo"
                  {...register("gender", {
                    required: "Campo requerido",
                  })}
                >
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Otro</option>
                </Select>
                {errors.gender && (
                  <FormErrorMessage>{errors.gender.message}</FormErrorMessage>
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
                  Registrarse
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

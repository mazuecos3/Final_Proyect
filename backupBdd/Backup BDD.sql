-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 12-06-2020 a las 13:04:34
-- Versión del servidor: 10.2.32-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gupoecom_valenrunner`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE TABLE `carreras` (
  `id_carrera` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `tiempo` double NOT NULL,
  `distancia` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `max_corredores` int(11) NOT NULL,
  `current_dorsal` int(11) DEFAULT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`id_carrera`, `nombre`, `tiempo`, `distancia`, `precio`, `max_corredores`, `current_dorsal`, `fecha`) VALUES
(14, 'Valencia Rio - Mestalla', 3, 5, 50, 500, 10, '2020-06-14'),
(15, 'Avenida Joaquin - Puerto', 4, 7, 45, 400, 11, '2020-06-15'),
(19, 'Carrera en Paiporta', 3, 5, 20, 100, NULL, '2020-06-19'),
(20, 'Carrera en Catarroja', 3, 5, 25, 200, NULL, '2020-06-20'),
(21, 'Carrera en Massarroj', 3, 5, 30, 200, NULL, '2020-06-21'),
(22, 'Carrera en Cheste', 5, 5, 25, 150, NULL, '2020-06-22'),
(23, 'VIII Playa Pinedo', 5, 10, 35, 150, NULL, '2020-06-23'),
(24, 'VII Rio Turia', 6, 10, 35, 300, 0, '2020-06-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`) VALUES
(1, 'Infantil'),
(2, 'Cadete'),
(3, 'Juvenil'),
(4, 'Junior'),
(5, 'Promesa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiempos-carreras`
--

CREATE TABLE `tiempos-carreras` (
  `id_usuario` int(11) NOT NULL,
  `id_carrera` int(11) NOT NULL,
  `tiempo` double NOT NULL,
  `dorsal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tiempos-carreras`
--

INSERT INTO `tiempos-carreras` (`id_usuario`, `id_carrera`, `tiempo`, `dorsal`) VALUES
(313, 15, 2, 27),
(324, 14, 2.3, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `email` varchar(200) NOT NULL,
  `edad` int(11) NOT NULL,
  `password` varchar(20) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `genero` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `email`, `edad`, `password`, `id_categoria`, `genero`) VALUES
(77, 'admin', 'admin@gmail.com', 21, 'admin', 1, 'hombre'),
(308, 'a', 'a', 15, '15', 1, 'Hombre'),
(309, 'undefined', 'undefined', 0, 'undefined', 1, 'undefined'),
(311, '123', 'a', 15, '15', 2, 'Mujer'),
(312, 'abecasdsf', 'asdfasdfa', 15, '15', 3, 'Mujer'),
(313, 'runnerPrueba2', 'brianGrande@gmail.com', 16, '12345', 2, 'Hombre'),
(320, '15333', 'oscar3mazuecos@hotmail.com', 15, '1515', 2, 'Mujer'),
(323, 'PepitoPalotes1', 'papito@gmail.com', 18, 'pepito', 4, 'Mujer'),
(324, 'runnerPrueba', 'oscar@gmail.com', 16, 'prueba123', 2, 'Mujer'),
(325, '1', '1', 1, '1', 5, 'Hombre'),
(329, 'aaaa', 'angel@hotmail.com', 18, '12345', 3, 'Hombre'),
(330, 'Vilche69', 'vilche@gmail.com', 25, 'Vilche69', 1, 'Mujer'),
(331, 'asa', 'asa', 13, 'paiporta', 1, 'Mujer'),
(332, '155', 'oscar3mazuecos@hotmail.com', 15, '15', 4, 'Mujer'),
(333, 'Tt', 'xaris.xatzipanayiotou@gmail.com', 35, 'test100', 4, 'Hombre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios-carreras`
--

CREATE TABLE `usuarios-carreras` (
  `id_carrera` int(11) NOT NULL,
  `fecha_compra` date DEFAULT current_timestamp(),
  `id_transaccion` varchar(255) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios-carreras`
--

INSERT INTO `usuarios-carreras` (`id_carrera`, `fecha_compra`, `id_transaccion`, `id_usuario`) VALUES
(14, '2020-06-10', '1', 324),
(15, '2020-06-09', '2', 313);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`id_carrera`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `tiempos-carreras`
--
ALTER TABLE `tiempos-carreras`
  ADD PRIMARY KEY (`id_usuario`,`id_carrera`),
  ADD KEY `id_carrera` (`id_carrera`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `usuarios-carreras`
--
ALTER TABLE `usuarios-carreras`
  ADD PRIMARY KEY (`id_carrera`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=336;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tiempos-carreras`
--
ALTER TABLE `tiempos-carreras`
  ADD CONSTRAINT `tiempos-carreras_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `tiempos-carreras_ibfk_2` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id_carrera`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios-carreras`
--
ALTER TABLE `usuarios-carreras`
  ADD CONSTRAINT `usuarios-carreras_ibfk_2` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id_carrera`),
  ADD CONSTRAINT `usuarios-carreras_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

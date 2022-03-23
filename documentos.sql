-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2022 a las 04:50:05
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `documentos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistente`
--

CREATE TABLE `asistente` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `directorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `asistente`
--

INSERT INTO `asistente` (`id`, `userId`, `directorId`) VALUES
(1, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compartido`
--

CREATE TABLE `compartido` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `documentoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `director`
--

CREATE TABLE `director` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `director`
--

INSERT INTO `director` (`id`, `userId`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento`
--

CREATE TABLE `documento` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `tipoDocumentoId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `compartida` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacione`
--

CREATE TABLE `notificacione` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 0,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(4, 'admin'),
(5, 'director'),
(6, 'asistente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`id`, `nombre`) VALUES
(1, 'OFICIO'),
(2, 'CARTA'),
(3, 'CIRCULAR'),
(4, 'MEMORANDUN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `roleId`, `name`, `email`, `password`) VALUES
(1, 4, 'jonathan vera macias', 'jonathankenny852@gmail.com', '$2b$10$fzIcxqHb2weRYGn4/ABRx.0uQvKeiCSnOtNC9PEkQGpjUKgIOTgqu'),
(2, 5, 'Carlos Soto', 'carlosSoto@gmail.com', '$2b$10$He.gBxJrLNLNWjzBX1Sqw.3AjIlel3uYrUrqaczkrV4C6v7KgggGe'),
(3, 6, 'Cristian Moreira', 'cristianMoreira@gmail.com', '$2b$10$Ka5SwdciDIN4f3cLOo.XPurnQIgMEYyMFyutXLul9YhEiGThHhYf6');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistente`
--
ALTER TABLE `asistente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_068b0cda10bcd2fd159e617bbaf` (`userId`),
  ADD KEY `FK_22ece125d7e963f872efbec44ea` (`directorId`);

--
-- Indices de la tabla `compartido`
--
ALTER TABLE `compartido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3a2bc976a6fe7e7aeb118d3ad3c` (`userId`),
  ADD KEY `FK_67b40be034ca54919b6451a5e3c` (`documentoId`);

--
-- Indices de la tabla `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9d87a9f38f0c210325642591d8a` (`userId`);

--
-- Indices de la tabla `documento`
--
ALTER TABLE `documento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d63c45d642a4a9b74609f3594a8` (`tipoDocumentoId`),
  ADD KEY `FK_467b259d33be6c1e5994114b02c` (`userId`);

--
-- Indices de la tabla `notificacione`
--
ALTER TABLE `notificacione`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3caf793430b0c0ca8ff2652ff1b` (`userId`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistente`
--
ALTER TABLE `asistente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compartido`
--
ALTER TABLE `compartido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `director`
--
ALTER TABLE `director`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `documento`
--
ALTER TABLE `documento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificacione`
--
ALTER TABLE `notificacione`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistente`
--
ALTER TABLE `asistente`
  ADD CONSTRAINT `FK_068b0cda10bcd2fd159e617bbaf` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_22ece125d7e963f872efbec44ea` FOREIGN KEY (`directorId`) REFERENCES `director` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `compartido`
--
ALTER TABLE `compartido`
  ADD CONSTRAINT `FK_3a2bc976a6fe7e7aeb118d3ad3c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_67b40be034ca54919b6451a5e3c` FOREIGN KEY (`documentoId`) REFERENCES `documento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `director`
--
ALTER TABLE `director`
  ADD CONSTRAINT `FK_9d87a9f38f0c210325642591d8a` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `documento`
--
ALTER TABLE `documento`
  ADD CONSTRAINT `FK_467b259d33be6c1e5994114b02c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_d63c45d642a4a9b74609f3594a8` FOREIGN KEY (`tipoDocumentoId`) REFERENCES `tipo_documento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notificacione`
--
ALTER TABLE `notificacione`
  ADD CONSTRAINT `FK_3caf793430b0c0ca8ff2652ff1b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

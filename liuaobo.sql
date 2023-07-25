/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : liuaobo

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 25/07/2023 16:53:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history`  (
  `date` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `order` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ISEND` tinyint(1) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES ('击毙太没', '77779999', 1);
INSERT INTO `history` VALUES ('击毙你', '8989889', 0);
INSERT INTO `history` VALUES ('击毙太没', '77779999', 1);
INSERT INTO `history` VALUES ('刘某人', NULL, 0);

-- ----------------------------
-- Table structure for permission_children
-- ----------------------------
DROP TABLE IF EXISTS `permission_children`;
CREATE TABLE `permission_children`  (
  `id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parentId` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `authName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `permission_children_ibfk_1`(`parentId` ASC) USING BTREE,
  CONSTRAINT `permission_children_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `permission_children` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission_children
-- ----------------------------
INSERT INTO `permission_children` VALUES ('1', '1', '商品列表', 'goods');
INSERT INTO `permission_children` VALUES ('2', '2', '订单列表', 'orders');
INSERT INTO `permission_children` VALUES ('3', '3', '权限列表', 'rights');
INSERT INTO `permission_children` VALUES ('4', '4', '用户列表', 'users');
INSERT INTO `permission_children` VALUES ('5', '5', '人员统计', 'reports');

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `authName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parentId` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `permissions_ibfk_1`(`parentId` ASC) USING BTREE,
  CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `permissions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES ('1', '商品管理-01', 'goods', NULL);
INSERT INTO `permissions` VALUES ('2', '订单管理-01', 'orders', NULL);
INSERT INTO `permissions` VALUES ('3', '权限管理-01', 'rights', NULL);
INSERT INTO `permissions` VALUES ('4', '用户管理-01', 'users', NULL);
INSERT INTO `permissions` VALUES ('5', '数据统计-01', 'reports', NULL);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `age` int NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('李雷', '6481436', 18);
INSERT INTO `user_info` VALUES ('韩梅梅', '6481433', 18);

SET FOREIGN_KEY_CHECKS = 1;

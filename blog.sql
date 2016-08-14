/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50629
 Source Host           : localhost
 Source Database       : blog

 Target Server Type    : MySQL
 Target Server Version : 50629
 File Encoding         : utf-8

 Date: 08/14/2016 23:52:07 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;



-- ----------------------------
--  Table structure for `post_tag_pivot`
-- ----------------------------
DROP TABLE IF EXISTS `post_tag_pivot`;
CREATE TABLE `post_tag_pivot` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_tag_pivot_post_id_index` (`post_id`),
  KEY `post_tag_pivot_tag_id_index` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `posts`
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content_raw` text COLLATE utf8_unicode_ci NOT NULL,
  `content_html` text COLLATE utf8_unicode_ci NOT NULL,
  `page_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `is_draft` tinyint(1) NOT NULL,
  `layout` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'blog.layouts.post',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `published_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`),
  KEY `posts_published_at_index` (`published_at`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `tags`
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `page_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `layout` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'blog.layouts.index',
  `reverse_direction` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_tag_unique` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

SET FOREIGN_KEY_CHECKS = 1;

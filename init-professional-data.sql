-- 插入专业服务数据
INSERT OR IGNORE INTO professional_service (image_url, title, button_text, link, sort_order, is_active) VALUES
('/images/煥新-Model-Y.png', 'Model Y 煥新', '查看詳情', '#contact', 1, 1),
('/images/特斯拉必備配件.webp', '車體包膜', '立即預約', '#contact', 2, 1),
('/images/特斯拉鍍膜防曬.webp', '鍍膜防曬', '立即預約', '#contact', 3, 1),
('/images/0701_新Y交車禮包2.jpg', '輪胎服務', '立即預約', '#contact', 4, 1);

-- 插入专业配件数据
INSERT OR IGNORE INTO professional_accessory (image_url, title, button_text, link, sort_order, is_active) VALUES
('/images/官網Banner_MOBEIL0316.jpg', 'Model Y 專用腳墊', '加入購物車', '#products', 1, 1),
('/images/煥新-Model-Y.png', 'Model 3 煥新套件', '加入購物車', '#products', 2, 1),
('/images/特斯拉必備配件.webp', '特斯拉必備配件', '加入購物車', '#products', 3, 1),
('/images/特斯拉鍍膜防曬.webp', '特斯拉收納盒', '加入購物車', '#products', 4, 1);

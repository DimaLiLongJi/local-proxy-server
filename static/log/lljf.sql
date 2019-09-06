-- 渠道

-- wxtw
-- dstw
-- cslb
-- wxtc
-- ZTRM
-- ZTYH
-- ZTTC
-- ZTTS
-- kfxx
-- wxmb


-- 套餐

-- 爱奇艺 https://wxxcs.hl139.net/pages/aiqiyi/aqy.html
-- 芒果 https://wxxcs.hl139.net/pages/mangguo/mangguo.html
-- 咪咕 https://wxxcs.hl139.net/pages/migu/migu.html
-- 聚合页 https://wxxcs.hl139.net/pages/summary/index.html


-- 办理

select * from number_supermarket_log where channel like '%wxtw%' and from_url like '%https://wxxcs.hl139.net/pages/aiqiyi/aqy.html%' and type = '办理成功';

select * from number_supermarket_log where channel like '%wxtw%' and from_url like '%https://wxxcs.hl139.net/pages/mangguo/mangguo.html%' and type = '办理成功';

select * from number_supermarket_log where channel like '%wxtw%' and from_url like '%https://wxxcs.hl139.net/pages/migu/migu.html%' and type = '办理成功';

select * from number_supermarket_log where channel like '%wxtw%' and from_url like '%https://wxxcs.hl139.net/pages/summary/index.html%' and type = '办理成功';


-- 访问

select * from number_supermarket_log where channel like '%wxtw%' and from_url like '%https://wxxcs.hl139.net/pages/aiqiyi/aqy.html%' and type is null and jump_url is null;

select * from number_supermarket_log where channel like '%wxtw%' and from_url like '%https://wxxcs.hl139.net/pages/mangguo/mangguo.html%' and type is null and jump_url is null;

select * from number_supermarket_log where channel like '%wxtw%' and from_url like '%https://wxxcs.hl139.net/pages/migu/migu.html%' and type is null and jump_url is null;

select * from number_supermarket_log where channel like '%wxtw%' and from_url like '%https://wxxcs.hl139.net/pages/summary/index.html%' and type is null and jump_url is null;

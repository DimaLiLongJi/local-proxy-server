/* ����
 * @param {any} bisCode
 * @param {any} bisEvent
 */
function multiTrack() {
    setTimeout(function () {
        try {
            leadeon.getCatchInfo({
                debug: false,
                success: function (res) {
                    $("head").append('<meta name="WT.plat" content="app">');
                    $("head").append('<meta name="WT.cid" content="' + res.cid + '">');//���ͱ�ʶ
                    $("head").append('<meta name="WT.av" content="' + res.version + '">');//�ͻ��˰汾��
                    //Loading webtrends
                    // var s = document.createElement("script"); s.async = true; s.src = "/static/common/hl_sdc_load.js";
                    // var s2 = document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s, s2);
                }
            });
        }
        catch(ex){
            console.error('绿点 getCatchInfo error:', ex);
            // var s = document.createElement("script"); s.async = true; s.src = "/static/common/hl_sdc_load.js";
            // var s2 = document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s, s2);
        }

    }, 600);
}
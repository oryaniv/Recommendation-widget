'use strict';

(function () {
    'use strict';

    window._oyRecommendations = window._oyRecommendations || {
        defaultElementId: "oy-recommendations",
        userDefinedElementId: undefined,
        scriptUrls: ['transpiled/widget.js', 'transpiled/articleItems.js', 'transpiled/intersectionObserver.js', 'transpiled/httpService.js', 'transpiled/widgetRunner.js'],
        styleUrls: ['./style/widget.css', './style/widget-desktop.css', './style/widget-mobile.css'],
        httpResourceParams: {
            apiUrl: 'http://api.taboola.com/1.0/json/',
            action: 'recommendations.get',
            publisher_id: 'taboola-templates',
            appType: 'desktop',
            apiKey: 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
            sourceId: 'oyRecommendation',
            count: 2,
            sourceType: 'video',
            sourceUrl: location.href
        }
    };
})();

(function () {
    window._oyRecommendations = window._oyRecommendations || {};
    var allScripts = document.querySelectorAll('script');
    var currentScript = allScripts[allScripts.length - 1];
    (function (el, id, sel, css, js, hrp) {
        var frame = document.createElement('iframe');
        var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var isMobile = mobilecheck();
        var viewPortWidthPercentRequired = isMobile ? 1 : 2 / 3;
        frame.style['border-width'] = 0;
        frame.style['width'] = viewPortWidth * viewPortWidthPercentRequired + 'px';
        frame.style['display'] = 'block';

        var container = el || document.querySelector('#' + id);
        if (container) {
            container.appendChild(frame);
        } else {
            sel.parentNode.insertBefore(frame, sel);
        }
        var html = "<div class='list-container'>" + "<div class='feed-header'>" + "<div class='icon'></div>" + "<h3 class='more-for'>More articles for you</h3>" + "<ul id='article-list'>" + "</ul>" + "<div id='error-message' style='display:none'>There was a problem, sorry for the inconvenience</div>" + "<p id='loader-container' class='lt-ie9'><i class='loader loader--large'></i></p>" + "<button id='anchor'>anchor</button>" + "</div>";

        var styles = css.filter(function (c) {
            return isMobile ? !c.includes('desktop') : !c.includes('mobile');
        }).map(function (c) {
            return "<link rel='stylesheet' href='" + c + "'>";
        });
        var scripts = js.map(function (s) {
            return "<script src='" + s + "'></script>";
        });
        frame.contentWindow.document.open('text/html', 'replace');
        frame.contentWindow.document.write(styles.join('\n') + html + scripts.join('\n'));
        frame.contentWindow.document.close();
        var options = {
            root: document.querySelector('#scrollArea'),
            rootMargin: '0px',
            threshold: 1.0
        };

        var callback = function callback() {
            var button = frame.contentWindow.document.querySelector("#anchor");
            button.click();
        };
        var observer = new IntersectionObserver(callback, options);
        frame.contentWindow.observer = observer;
        frame.httpResourceParams = hrp;
        function mobilecheck() {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                    check = true;
                }
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };
    })(document.getElementById('#' + _oyRecommendations.defaultElementId), _oyRecommendations.elementId, currentScript, _oyRecommendations.styleUrls, _oyRecommendations.scriptUrls, _oyRecommendations.httpResourceParams);
})();
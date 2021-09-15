$(() => {
    let path = 'img/';
    let image = ["koshka.jpg","dubai.jpg","covid.jpg","maldivi.jpg","ozero.jpg","tayga.jpg","vecher.jpg","voda.jpg","zakat.jpg"];
    let x = 0;
    let timer = setTimeout(change, 5000);

    const slider = $("#mySlider3");
    slider
        .css({
            position: 'relative',
            margin: 'auto',
            width: '95%',
            height: '80vh',
            'box-shadow': '0 0 10px #666',
            overflow: 'hidden',
            'background': 'url(' + path + image[x] + ') center/cover'
        })
        .append('<div id="slide"></div>')
        .append('<div id="tumbs"></div>')
        .append('<div id = "indicator"></div>')
        .click((e)=>{
            change( e.pageX < $(window).width() / 2 ? -1 : 1 ); // esli v levuyu storonu to -1
        })

    const slide = $("#slide");
    slide.css({
        position: 'absolute',
        left: slider.width(),
        width: slider.width(),
        height: slider.height(),
        'background': '#eee center/cover'
    })

    const tumbs = $("#tumbs");
    tumbs.css({
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        'justify-content': 'center'
    })
    const indicator= $("#indicator"); 
    indicator.css({
        position: 'absolute', 
        top: '10px', 
        width: '0%', 
        border: '5px solid #A52A2A'
    })

    image.forEach(item => tumbs.append('<img src="' + path + item + '" />') );

    tumbs.children()
        .css({
            width: '30px',
            height: '30px',
            'border-radius': '50%',
            border: '2px solid #fff',
            margin: '10px',
            cursor: 'pointer',
            transition: '.2s'
        })
        .mouseenter(function(){
            tumbScale($(this), 1.2) // this - eto image 
        })
        .mouseleave(function(){
            tumbScale($(this), 1) 
        })
        .click(function(e){
            e.stopPropagation();
            x = $(this).index();
            change(0); // chto bi x ne uvelichivalsya 
        })

    function change(d = 1) {
        clearTimeout(timer);
        x += d;
        if (x > image.length - 1) x = 0; 
        if (x < 0) x = image.length - 1;
        indicator.stop(); 

        slide 
            .css({
                left: (d ? d : 1) * slider.width(), // esli poluchaet znacheniye 0 ili 1   => 1 * slider.width = peremeshayetsa v pravo  na  odin slayder ; esli -1 => -1 * slider.width = v levo idet slayder ; a
                'background-image': 'url(' + path + image[x] + ')'
            })
            .animate({left: 0}, "slow", () => { // 0 peredviqayet - na vidimoe mesto 
                slider.css('background-image', 'url(' + path + image[x] + ')'); // v silder( osnovnoe) menayayetsa fotka 
                tumbScale(tumbs.children(), 1);
                tumbScale(tumbs.children().eq(x), 1.2);
            })
        
        animIndicator(); 
        timer = setTimeout(change, 5000);
    }

    animIndicator(); 
    function animIndicator(){
        indicator.css({width: "0"}).animate({width: "100%"}, 5000)  
    }
    console.log(indicator); 

    function tumbScale(elem, coof) {
        elem.css({
            transform: 'scale(' + coof + ')',
        })
    }
   
})
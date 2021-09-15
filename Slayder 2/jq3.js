$(() => {
    let path = 'img/';
    let image = ["koshka.jpg","dubai.jpg","covid.jpg","maldivi.jpg","ozero.jpg","tayga.jpg","vecher.jpg","voda.jpg","zakat.jpg"];
    let timer = setTimeout(change, 3000);
    let x = 0;

    $("#mySlider2")
        .css({
            position: 'relative',
            margin: 'auto',
            width: '95%',
            height: '80vh',
            'box-shadow': '0 0 10px #666',
            overflow: 'hidden'
        })
        .append('<div id="container"></div> <div id="tumb"></div>')
        .click( (e) => {
            if (e.pageX < $(window).width() / 2) x -= 2;// pochemu window??
            change();
        } );

    $("#container")
        .css({
            position: 'absolute',
            height: '100%',
            display: 'flex',
        });
    
    const tumb = $("#tumb"); 
    
    tumb.css({
            position: 'absolute',
            width: '100%',
            bottom: 0,
            'text-align': 'center'
        })
    
    image.forEach(img => {
        $("#container").append('<img src="' + path + img + '" />');
        
        tumb.append('<img src="' + path + img + '" />');
    });

    $("#container>img")
        .css({
            flex: '0 0 ' + $("#mySlider2").width() + 'px',
            height:  $("#mySlider2").height() + "px",
            'object-fit': 'cover' // rastyanut polnostyu bez deformacii 
        })
    
    tumb.children().css({
            width: '30px',
            height:  '30px',
            'border-radius': '50%',
            margin: '10px',
            border: '3px solid #fff',
            'object-fit': 'cover',
            cursor: 'pointer',
            transition: '.2'
        })
        .mouseenter(function() {
            $(this).css({
                transform: 'scale(1.6)', 
                border: '4px solid #FF1493'
            })
        })
        .mouseleave(function(){
            $(this).css({
                transform: 'scale(1)',
                border: '3px solid #fff'
            })
        })
        
        .click( function(e){
            e.stopPropagation();
            x = $(this).index()-1;
            change();
        })

    function change() {
        clearTimeout(timer);
        if( x < image.length - 1 ) x++; // peremeshat na nujnuyu kartinku , esli ne ++ , to bilo bi na odnu kartinu menshe 
        else x = 0;
        if( x < 0) x = image.length-1;
        selectImage();
        $("#container")
            .animate({
                left: -1 * x * $("#mySlider2").width() + 'px'
            }, "slow")

        timer = setTimeout(change, 3000);
    }

    selectImage(); 
    
    function selectImage(){
        tumb.children().css({transform: 'scale(1)'}).eq(x) // eq - naxodit  po indexu elementa 
            .css({
                transform: 'scale(1.5)'
            })
   }


})
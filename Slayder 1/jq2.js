$(document).ready(function(){
    let path = 'img/';
    let image = ["koshka.jpg","dubai.jpg","covid.jpg","maldivi.jpg","ozero.jpg","tayga.jpg","vecher.jpg","voda.jpg","zakat.jpg"];
    let index = 0;//pokazival o element masiva image
    let timer = setTimeout(change, 3000);
    

    $("#mySlider1")
        .css({
            position: 'relative',
            margin: 'auto',
            width: '95%',
            height: '80vh',
            'box-shadow': '0 0 10px #666',
        })
        .html('<div id="container"></div><div id="tumb"></div><p id = "para">1/9</p>')
        .click((event) => {
         if(event.pageX > $(document).width() / 2) change(1);// pravaya chast
            else change(-1);
        });
    
       

    $("#container").css({
        width: '100%',
        height: '100%',
        background: '#eee center/cover',
        'background-image': 'url(' + path + image[index] + ')' 
    });
    $("#para").css({
        position: 'absolute', 
        top: 0, 
        left: '10%',
    })

    $("#tumb")
        .css({
            position: 'absolute',
            bottom: 0,
            'text-align': 'center',
            width: '100%',
            height: '50px'
        })
    
        .html(image.map(item => '<img  src="' + path + item + '" />').join(''));
        

        
        $("#tumb>img").css({
            width: '30px',
            height: '30px',
            margin: '10px',
            'border-radius': '50%',
            border: '3px solid #fff',
            cursor: 'pointer'
        })
       
        .click(function(e){
            e.stopPropagation(); 
            index = $(this).index();
            change(0); 
            console.log($(this).index()); 
        });

        
       

    function change(dir = 1) {
       
        clearTimeout(timer);
        index += dir;

        if(index > image.length - 1) index = 0;
        if(index < 0) index = image.length - 1;

        $("#para")
            .html(index + 1 + "/" + image.length); 


        $("#container")
            .fadeOut('slow', function() {
                $(this)
                    .css({'background-image': 'url(' + path + image[index] + ')' })
                    .fadeIn('slow');
                    timer = setTimeout(change, 3000);
            })
    
    }
    
})
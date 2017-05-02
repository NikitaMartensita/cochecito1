var app = {
  inicio: function() {
  	ANCHO_COCHE = 50;
  	dificultad = 0;
  	velocidadX = 0;
  	velocidadY = 0;
  	crashx=-1000;
  	crashy=-1000;
  	incremento1 = -105;
  	incremento2 = -1000;
  	puntuacion = 0;
    alto = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;
    app.iniciaJuego();
    app.vigilaSensores();
  },

  iniciaJuego: function() {

    function preload(){
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = '#ffffff';
      game.load.image('coche', 'assets/coche.png');
      game.load.image('adversario1', 'assets/adversario1.png');
      game.load.image('adversario2', 'assets/adversario2.png');
      game.load.image('crash', 'assets/crash.png');
      game.load.image('gameover', 'assets/gameover.png');
    
    }

    function create(){
      coche = game.add.sprite(app.inicioX(), alto-100, 'coche');
      adversario1 = game.add.sprite(app.inicioX(), incremento1, 'adversario1');
      adversario2 = game.add.sprite(app.inicioX(), incremento2, 'adversario2');
      crash = game.add.sprite(crashx,crashy,'crash'); 
      game.physics.arcade.enable(coche);
      game.physics.arcade.enable(adversario1);
      game.physics.arcade.enable(adversario2);
      game.physics.arcade.enable(crash);
      game.physics.arcade.enable(gameover);
      coche.body.collideWorldBounds = true;  
    }
    function update(){
      var factorDificultad = (300 + (dificultad * 100));
      coche.body.velocity.x = (velocidadX * (-1 * factorDificultad));
      adversario1.body.velocity.y = velocidadY+100;
      adversario2.body.velocity.y = velocidadY+200;
      crash.body.x =crashx ;
	    crash.body.y =crashy;
      game.physics.arcade.overlap(coche, adversario1, app.crash, null, this);
    }
    

    var estados = { preload: preload, create: create, update: update };
    var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser',estados);
},

 inicioX: function() {
    return app.numeroAleatorioHasta(ancho - ANCHO_COCHE);
  },

  numeroAleatorioHasta: function(limite) {
    return Math.floor(Math.random() * limite);
  },
vigilaSensores: function() {
    function onError() {
      console.log('onError!');
    }
    function onSuccess(datosAceleracion) {
      
      app.registraDireccion(datosAceleracion);
    }
    navigator.accelerometer.watchAcceleration(onSuccess, onError, {
      frequency: 10
    });
  },
registraDireccion: function(datosAceleracion) {
    velocidadX = datosAceleracion.x;
  },

crashX : function(){
 return coche.body.x;
},
crashY : function(){
 return coche.body.y;
},

crash: function(){
	crash.body.x = app.crashX();
	crash.body.y = app.crashY();
	if(adversario1.body.y>alto+incremento1){
		adversario1.body.y = incremento1;
	    adversario1.body.x = app.inicioX();
	}
}

 

};
if ('addEventListener'in document) {
  document.addEventListener('deviceready', function() {
    app.inicio();
  }, false);
}

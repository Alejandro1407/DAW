var answer=[  //Simula la respuesta en Json Obtenida desde una base de datos real por PHP, Solo para Avance 1,Avance 2 PHP Y MySQL
   {"id":1,"Nombre":'Nike',"Categoria":'Zapatos',"Cantidad":13, "Precio":'13.00'},
   {"id":2,"Nombre":"Adidas","Categoria":"Zapatos","Cantidad":12,"Precio":"16.00"},
   {"id":3,"Nombre":"Balon","Categoria":"Futbol","Cantidad":45,"Precio":"2.50"},
   {"id":4,"Nombre":"Camiseta","Categoria":"Ropa","Cantidad":50,"Precio":"5.50"},
   {"id":5,"Nombre":"Caminadora","Categoria":"Ejercicio","Cantidad":2,"Precio":"125.50"},
   {"id":6,"Nombre":"Sudadera","Categoria":"Ejercicio","Cantidad":35,"Precio":"1.50"},
   {"id":7,"Nombre":"Calzoneta","Categoria":"Ejercicio","Cantidad":25,"Precio":"3.25"},
   {"id":8,"Nombre":"Legins","Categoria":"Ejercicio","Cantidad":15,"Precio":"2.35"},
   {"id":9,"Nombre":"Vans","Categoria":"Zapatos","Cantidad":5,"Precio":"25.60"},
   {"id":10,"Nombre":"Action Force","Categoria":"Zapatos","Cantidad":25,"Precio":"14.50"},
   {"id":11,"Nombre":"Pans","Categoria":"Deporte","Cantidad":23,"Precio":"3.50"},
   {"id":12,"Nombre":"Shorts","Categoria":"Ropa","Cantidad":25,"Precio":"12.50"},
   {"id":13,"Nombre":"Tennis","Categoria":"Zapatos","Cantidad":125,"Precio":"14.50"},
   {"id":14,"Nombre":"Pesas","Categoria":"Ejercicio","Cantidad":23,"Precio":"125.50"},
   {"id":15,"Nombre":"Jeans","Categoria":"Ropa","Cantidad":2,"Precio":"12.30"},
   {"id":16,"Nombre":"Vitaminas","Categoria":"Salud","Cantidad":12,"Precio":"25.60"}
];
// var Registro = /^[A-Z]{1}(\w){1,}$/g Mayuscula,Algo,y debe terminar en numeros
var Valid_Email = 0;
var Valid_Pass = 0;
var RegisterValidEmail = 0;
var RegisterValidNombre = 0;
var RegisterValidContraseña = 0;
var Sesion_Iniciated = "";
var menu = "";

window.onload = function(){
    
   Sesion_Iniciated= this.sessionStorage.getItem("Sesion");
    if(Sesion_Iniciated != null){
        menu = '<div class="dropdown">';
        menu += '<button type="button" class="btn btn-indigo shadow-none dropdown-toggle p-3 m-0" data-toggle="dropdown">'+Sesion_Iniciated+'</button>        ';
        menu += '<div class="dropdown-menu">';
        menu += '<a class="dropdown-item" href="">Item 1</a>';
        menu += '<a class="dropdown-item" href="">Item 2</a>';
        menu += '<a class="dropdown-item" href="">Item 3</a>';
        menu += '<h5 class="dropdown-header">Cuenta</h5>';
        menu += '<a type="button" onclick="CerrarSesion()" class="dropdown-item "><i class="fas fa-sign-out-alt"></i>Cerrar Sesion</a>';
        menu += '</div>';
        menu += '</div>';
        menu += '<a href="Carrito.php" type="button" class="btn btn-indigo shadow-none mt-2 m-0 p-1">';
        menu += '<i class="fas fa-2x fa-shopping-cart"></i><span class="badge badge-light">0</span>';
        menu += '</a>';
        }else{
        menu = '<a class="indigo" data-toggle="modal" data-target="#modalLoginForm"><span class="mr-3"> <i class="fas fa-sign-in-alt"></i>Entrar</span></a>';
        menu += '<a class="indigo" data-toggle="modal" data-target="#modalRegisterForm"><span><i class="fas fa-user-plus"></i> Registrarse</span> </a>';
    }
    document.getElementById("Sesion").innerHTML =  menu;
   
    document.getElementById('LogInFormEmail').value = "";
    document.getElementById('LogInFormPassword').value = "";
  
    document.getElementById('LogInFormEmail').onkeyup = function(){
        console.log("Keyup");
        CheckLogInEmail(0);
    };
    document.getElementById('LogInFormEmail').onfocusout = function () { 
        CheckLogInEmail(1);
     };
     document.getElementById('LogInFormEmail').onfocus =function () { 
        document.getElementById('LogInFormEmailInValid').classList.add("d-none");
        document.getElementById('LogInFormEmailValid').classList.add("d-none");
        document.getElementById('LogInFormPassword').value = "";
        document.getElementById('LogInFormPassword').setAttribute("disabled","disabled");
        document.getElementById('LogInFormPassInValid').classList.add("d-none");
        document.getElementById('LogInFormPassValid').classList.add("d-none");
        document.getElementById('LogInFormBtn').setAttribute("disabled","disabled");
        Valid_Pass = 0;
     };
     /* Contraseña */
     document.getElementById('LogInFormPassword').onkeyup = function(){
        CheckLogInPassword(0);
    };
    document.getElementById('LogInFormPassword').onfocusout =function () { 
        CheckLogInPassword(1);
     };
     document.getElementById('LogInFormEmail').onfocus = function () { 
        document.getElementById('LogInFormPassValid').classList.add("d-none");
        document.getElementById('LogInFormPassInValid').classList.add("d-none");
     };
     document.getElementById('ShowPassLogin').onclick = function() {
        document.getElementById('ShowPassLogin').classList.toggle("fa-eye");
        document.getElementById('ShowPassLogin').classList.toggle("fa-eye-slash");
         var Attr = document.getElementById('LogInFormPassword').getAttribute("type"); //Se obtiene el metodo Actual
        if(Attr == "password"){
            document.getElementById('LogInFormPassword').setAttribute("type","text");
        }else{
            document.getElementById('LogInFormPassword').setAttribute("type","password");
        }
     };
     /*  */
     document.getElementById('LogInFormBtn').onclick=function(){
            FormLogIn();
     };
     /* Registro */
     document.getElementById('RegisterFormNombre').onkeyup = function(){
        CheckRegisterNombre(0);
     };
     document.getElementById('RegisterFormNombre').onfocusout = function(){
        CheckRegisterNombre(1);
     };
     document.getElementById('RegisterFormNombre').onfocus = function () { 
        document.getElementById('RegisterFormNombreValid').classList.add("d-none");
        document.getElementById('RegisterFormNombreInValid').classList.add("d-none");
     };
     document.getElementById('RegisterFormEmail').onkeyup = function(){
        CheckRegisterEmail(0);
     };
     document.getElementById('RegisterFormEmail').onfocusout = function(){
        CheckRegisterEmail(1);
     };
     document.getElementById('RegisterFormEmail').onfocus = function () { 
        document.getElementById('RegisterFormEmailValid').classList.add("d-none");
        document.getElementById('RegisterFormEmailInValid').classList.add("d-none");
     };
     document.getElementById('RegisterFormPass').onkeyup = function(){
        CheckRegisterPass(0);
     };
     document.getElementById('RegisterFormPass').onfocusout = function(){
        CheckRegisterPass(1);
     };
     document.getElementById('RegisterFormPass').onfocus = function () { 
        document.getElementById('RegisterFormPassValid').classList.add("d-none");
        document.getElementById('RegisterFormPassInValid').classList.add("d-none");
     };
     document.getElementById('ShowPassRegister').onclick = function() {
        document.getElementById('ShowPassRegister').classList.toggle("fa-eye");
        document.getElementById('ShowPassRegister').classList.toggle("fa-eye-slash");
         var Attr = document.getElementById('RegisterFormPass').getAttribute("type"); //Se obtiene el metodo Actual
        if(Attr == "password"){
            document.getElementById('RegisterFormPass').setAttribute("type","text");
        }else{
            document.getElementById('RegisterFormPass').setAttribute("type","password");
        }
     };
     document.getElementById('RegisterFormBtn').onclick = function(){
            Registro();
     };

//Luego de inicio
    /*  Depuracion*/
            /* Creacion de Cookie
            document.cookie = "Nombre=Alejandro";
            document.cookie = "Usuario=Pepito";
            */
           /* Eliminar una Cookie
            document.cookie = "Nombre=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
            document.cookie = "Usuario=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        */
//Catalogo Listeners
Mostrar_Data(document.getElementById('Categoria').value);
document.getElementById("Categoria").onchange = function(){
    Mostrar_Data(document.getElementById('Categoria').value);
} 
document.getElementById("Cantidad").onchange = function(){
    Mostrar_Data(document.getElementById('Categoria').value);
}
document.getElementById('txtBuscar').onkeyup = function(e) {
    Mostrar_Data(document.getElementById('Categoria').value,e.target.value);
};


};
function CerrarSesion() {
    sessionStorage.removeItem("Sesion");
    location.reload();
}

function  CheckLogInEmail(Isfocusout) {
    var Check_Email = /^(\w){5,}(@){1}(\w){1,}(\.{1}(\w){2,}){1,}$/g;
    var Email = document.getElementById('LogInFormEmail').value;
    var Check = Check_Email.test(Email);
    if(Check === true){ //Debe ser igualada o genera Bug 
       if(Email === "email@gmail.com"){
        document.getElementById('LogInFormEmailInValid').classList.add("d-none");
        document.getElementById('LogInFormEmailValid').classList.remove("d-none");
        document.getElementById('LogInFormPassword').removeAttribute("disabled","disabled");
                Valid_Email = 1;
                if(Valid_Email === 1 && Valid_Pass === 1){
            document.getElementById('LogInFormBtn').removeAttribute("disabled","disabled");
                }else{
            document.getElementById('LogInFormBtn').setAttribute("disabled","disabled");
                }
               }else{
                document.getElementById('LogInFormPassword').setAttribute("disabled","disabled");
                Valid_Email = 0;
                document.getElementById('LogInFormEmailValid').classList.add("d-none");
                document.getElementById('LogInFormEmailInValid').classList.remove("d-none");
            }
    }else{
        Valid_Email = 0;
        document.getElementById('LogInFormPassword').setAttribute("disabled","disabled");
        document.getElementById('LogInFormEmailValid').classList.add("d-none");
         if(Isfocusout == 1){
        document.getElementById('LogInFormEmailInValid').classList.remove("d-none");
        }
    }
}
function CheckLogInPassword(Isfocusout) {
    var Check_PassWord = /^[A-Z]{1}((\w){1,})*(\d)$/;
    var password = document.getElementById('LogInFormPassword').value;
    var Check = Check_PassWord.test(password);
    if(Check === true){ //Debe ser igualada o genera Bug 
        var Email = document.getElementById('LogInFormEmail').value;
                if((Email === "email@gmail.com")&&(password === "Password1")){
                    document.getElementById('LogInFormPassInValid').classList.add("d-none");
                    document.getElementById('LogInFormPassValid').classList.remove("d-none");
                    Valid_Pass = 1;
                    if(Valid_Email === 1 && Valid_Pass === 1){
                        document.getElementById('LogInFormBtn').removeAttribute("disabled","disabled");
                    }else{
                        document.getElementById('LogInFormBtn').setAttribute("disabled","disabled");
                    }
                }else{
                    document.getElementById('LogInFormPassValid').classList.add("d-none");
                    document.getElementById('LogInFormPassInValid').classList.remove("d-none");
                    Valid_Pass = 0;
                }
            }else{
            document.getElementById('LogInFormPassValid').classList.add("d-none");
        if(Isfocusout == 1){
            document.getElementById('LogInFormPassValid').classList.add("d-none");
            document.getElementById('LogInFormPassInValid').classList.remove("d-none");
        }
  }
}
function FormLogIn() {
    var Email = Email = document.getElementById('LogInFormEmail').value;
    var password = document.getElementById('LogInFormPassword').value;
        document.getElementById('m-footer-login').innerHTML  = '<img src="img/Loading.gif">';
        if((Email === "email@gmail.com")&&(password === "Password1")){
            setTimeout(function () {   
            sessionStorage.setItem("Sesion","Alejandro");
                document.getElementById('m-footer-login').innerHTML = '<i class="fa fa-check fa-4x mb-3 FormValid animated rotateIn"></i>';
                setTimeout (function () {location.reload()},1000);
            },1000);
            }
        
        }  
function CheckRegisterNombre(Isfocusout) { 
    var Check_Nombre= /^([A-Z]{1})+([a-z]){2,}(([" "][A-Z][a-z]{1,})?){1}$/g 
    var Nombre = document.getElementById('RegisterFormNombre').value;
    var Check = Check_Nombre.test(Nombre);
    if(Check === true){
        RegisterValidNombre = 1;
        document.getElementById('RegisterFormNombreInValid').classList.add("d-none");
        document.getElementById('RegisterFormNombreValid').classList.remove("d-none");
        if((RegisterValidNombre === 1) && (RegisterValidEmail === 1) &&  (RegisterValidContraseña === 1)){
            document.getElementById('RegisterFormBtn').removeAttribute("disabled","disabled");
        }else{
            document.getElementById('RegisterFormBtn').setAttribute("disabled","disabled");
        }
    }else{
        RegisterValidNombre = 0;
        document.getElementById('RegisterFormBtn').setAttribute("disabled","disabled");
        document.getElementById('RegisterFormNombreValid').classList.add("d-none");
    if(Isfocusout == 1){
        document.getElementById('RegisterFormNombreValid').classList.add("d-none");
        document.getElementById('RegisterFormNombreInValid').classList.remove("d-none");
     }
    }
}
function CheckRegisterEmail(Isfocusout){
    var Check_Email = /^(\w){5,}(@){1}(\w){1,}(\.{1}(\w){2,}){1,}$/g;
    var Email = document.getElementById('RegisterFormEmail').value;
    var Check = Check_Email.test(Email);
    console.log(Check);
    if(Check === true){ //Debe ser igualada o genera Bug 
                if(Email != "email@gmail.com"){
                    RegisterValidEmail = 1;
                    document.getElementById('RegisterFormEmailInValid').classList.add("d-none");
                    document.getElementById('RegisterFormEmailValid').classList.remove("d-none");
                if((RegisterValidNombre === 1) && (RegisterValidEmail === 1) &&  (RegisterValidContraseña === 1)){
                    document.getElementById('RegisterFormBtn').removeAttribute("disabled","disabled");
                }else{
                    document.getElementById('RegisterFormBtn').setAttribute("disabled","disabled");
                }
            }else{
                RegisterValidEmail = 0;
                document.getElementById('RegisterFormEmailValid').classList.add("d-none");
                document.getElementById('RegisterFormEmailInValid').classList.remove("d-none");
            }
    }else{
        RegisterValidEmail = 0;
        document.getElementById('RegisterFormBtn').setAttribute("disabled","disabled");
        document.getElementById('RegisterFormEmailValid').classList.add("d-none");
         if(Isfocusout == 1){
            document.getElementById('RegisterFormEmailValid').classList.add("d-none");
            document.getElementById('RegisterFormEmailInValid').classList.remove("d-none");
     }
}
}
function CheckRegisterPass(Isfocusout){
    var Check_PassWord = /^[A-Z]{1}((\w){1,})*(\d{1,})$/g;
    var password = document.getElementById('RegisterFormPass').value;
    var Check = Check_PassWord.test(password);
    if(Check === true){ //Debe ser igualada o genera Bug 
        RegisterValidContraseña = 1;
        document.getElementById('RegisterFormPassInValid').classList.add("d-none");
        document.getElementById('RegisterFormPassValid').classList.remove("d-none");
        if((RegisterValidNombre === 1) && (RegisterValidEmail === 1) &&  (RegisterValidContraseña === 1)){
            document.getElementById('RegisterFormBtn').removeAttribute("disabled","disabled");
        }else{
            document.getElementById('RegisterFormBtn').setAttribute("disabled","disabled");
        }
        }else{
            document.getElementById('RegisterFormBtn').setAttribute("disabled","disabled");
            RegisterValidContraseña = 0;
            document.getElementById('RegisterFormPassValid').classList.add("d-none");
         if(Isfocusout == 1){
            document.getElementById('RegisterFormPassValid').classList.add("d-none");
            document.getElementById('RegisterFormPassInValid').classList.remove("d-none");
        }
    }
}
function Registro() {
    var Nombre = document.getElementById('RegisterFormNombre').value;
    var Email = document.getElementById('RegisterFormEmail').value;
    var Contraseña = document.getElementById('RegisterFormPass').value;
       document.getElementById('m-footer-registro').innerHTML = '<img src="img/Loading.gif">';
       setTimeout(function (){
        document.getElementById('m-footer-registro').innerHTML = '<i class="fa fa-check fa-4x mb-3 FormValid animated rotateIn"></i>';
                setTimeout (function () {location.reload()},1000);
                sessionStorage.setItem("Sesion",Nombre);
       },1000);
       
     
} 

//Funciones Catalogo
function Mostrar_Data(Categoria,Parametro = ""){//Al buscar no mostrara nada si solo hay uno
    document.getElementById('Inventario').innerHTML = '<img src="img/Loading.gif">';
    setTimeout(function () {
    if(Parametro == ""){
        var Exp = new RegExp("[\w]{0,}","gi");
    }else{
       // ^()+(\w){1,}([" "]+(\w){1,})?
       var Exp =  new RegExp('^('+Parametro+')([A-Za-z]|[ ]){0,}',"gi");//([A-Za-z]{0,})$',"gi");
       
    }
    console.log(Exp);
    var limit = parseInt(document.getElementById("Cantidad").value); //.Value Devuele String
    /* Responsive  */
    var sm = 0;
    var md = 0
    var lg = 0
    var xl = 0
     switch (limit){ //Evita que si hay menos de los necesario para una fila se agrande mas de lo necesario
        case 2:
        xl = 6;
        lg = 6;
        md = 6;
        sm = 6;
        break;
        case 3:
        xl = 4;
        lg = 4;
        md = 6;
        sm = 6;
        break;
        case 4:
        xl = 3;
        lg = 3;
        md = 6;
        sm = 6;
        break;
        case 5:
        xl = 3;
        lg = 4;
        md = 6;
        sm = 6;
        break;
    }
    var to_order = 0;
    var to_print = "";
     if(Categoria == "Todo"){
         console.log(answer.length);
         for(i = 0;i<answer.length;i++){
            if(Exp.test(answer[i].Nombre) === true){
                to_order++;
            }
         }
         console.log(to_order);
        var y = 0; //Saber cuantos se lleva
        var Filas_Res =  (to_order % limit); //Fila no hay Suficientes Registros para llenar un Deck
        var Restante  = to_order;  //Cuantos Faltan por Mostrar
        to_print =  '<div class="card-deck w-100 mt-3 ">'; //Variable que guarda lo que se imprimira
        var done = 0;
        for(var i =0;i<answer.length;i++){
            if(Exp.test(answer[i].Nombre) === true){
            y++;  //Se ordena uno mas
            Restante--; //Falta uno menos por ordenar
            
           if(Filas_Res > Restante){ //Si hay residuos se dejan centrados
            if(done == 0){//If para que solo imprima una vez el card-deck
                to_print += '<div class="card-deck w-100 mt-5 d-flex justify-content-center">';
                done = 1;
            }
            to_print += '<div class="container-fluid card  col-xl-' + xl + ' col-lg- ' + lg + ' col-md-' + md + ' col-sm-'+ sm + ' ">'; // col-' + col + '
            to_print += '<img src="data/' + answer[i].id +'.jpg" class="card-img img-fluid img_data ml-auto mr-auto" >'; 
            to_print += '<p class="card-header indigo darken-3 text-white text-center">' + answer[i].Nombre +'</p>';
            to_print += '<p class="card-body text-center">Categoria: ' + answer[i].Categoria + '<br>Cantidad:' +  answer[i].Cantidad  +'<br>Precio:$'+ answer[i].Precio+'</p>';
            to_print += '<button id="'+answer[i].id +'" class="btn btn-blue_ text-white text-center card-footer" onclick="Mostrar_Info(this.id)"><i class="fas fa-shopping-cart"></i> Comprar</button>';
            to_print += '</div>';
             if(Restante == 0){
                to_print += '</div>';
            }
           }else{//Si no hay residuo se imprime segun se seleccione
            to_print += '<div class="container-fluid card col-xl-' + xl + ' col-lg-' + lg + ' col-md-' + md + ' col-sm-'+ sm + '">'; // col-' + col + '
            to_print += '<img src="data/' + answer[i].id +'.jpg" class="card-img img-fluid img_data ml-auto mr-auto" >'; 
            to_print += '<p class="card-header indigo darken-3 text-white text-center">' + answer[i].Nombre +'</p>';
            to_print += '<p class="card-body text-center">Categoria: ' + answer[i].Categoria + '<br>Cantidad:' +  answer[i].Cantidad  +'<br>Precio:$'+ answer[i].Precio+'</p>';
            to_print += '<button id="'+answer[i].id +'" class="btn btn-blue_ text-white text-center card-footer" onclick="Mostrar_Info(this.id)"><i class="fas fa-shopping-cart"></i> Comprar</button>';
            to_print += '</div>';
            if((y == limit)){
                to_print += '</div> ';
                if(Restante > Filas_Res){ 
                   to_print += '<div class="card-deck w-100 mt-5">';
                 }
                y = 0;
                } //Y
            }//Else
        }//If Buscador
        }//For
        $("#Inventario").html(to_print); //Imprime los Resultados
    
     }//If
     else{
    for(var i =0;i<answer.length;i++){
        if(answer[i].Categoria == Categoria &&(Exp.test(answer[i].Nombre) === true))
        {
           to_order++;//Saber cuantos Coninciden
        }
    console.log(to_order);
    }
    
    var y = 0; //Saber cuantos se lleva
    var Filas_Res =  (to_order % limit); //Fila no hay Suficientes Registros para llenar un Deck
    var Restante  = to_order;  //Cuantos Faltan por Mostrar
    to_print =  '<div class="card-deck w-100 mt-3 ">'; //Variable que guarda lo que se imprimira
    var done = 0;
    for(var i =0;i<answer.length;i++){
      if((answer[i].Categoria == Categoria) && (Exp.test(answer[i].Nombre) === true)) //Ordenar las concidencias
        {y++;  //Se ordena uno mas
            Restante--; //Falta uno menos por ordenar
            console.log("Ordenados: " + y + " Por Ordenar: " + Restante);
             if(Filas_Res > Restante){ //Si hay residuos se dejan centrados
               if(done == 0){//If para que solo imprima una vez el card-deck
                to_print += '<div class="card-deck w-100 mt-5 d-flex justify-content-center">';
                done = 1;
               }  
                to_print += '<div class="container-fluid card  col-xl-' + xl + ' col-lg- ' + lg + ' col-md-' + md + ' col-sm-'+ sm + ' ">'; // col-' + col + '
                to_print += '<img src="data/' + answer[i].id +'.jpg" class="card-img img-fluid img_data ml-auto mr-auto" >'; 
                to_print += '<p class="card-header indigo darken-3 text-white text-center">' + answer[i].Nombre +'</p>';
                to_print += '<p class="card-body text-center">Categoria: ' + answer[i].Categoria + '<br>Cantidad:' +  answer[i].Cantidad  +'<br>Precio:$'+ answer[i].Precio+'</p>';
                to_print += '<button id="'+answer[i].id +'" class="btn btn-blue_ text-white text-center card-footer" onclick="Mostrar_Info(this.id)"><i class="fas fa-shopping-cart"></i> Comprar</button>';
                to_print += '</div>';
                 if(Restante == 0){
                    to_print += '</div>';
                }
               }else{//Si no hay residuo se imprime segun se seleccione
                to_print += '<div class="container-fluid card col-xl-' + xl + ' col-lg-' + lg + ' col-md-' + md + ' col-sm-'+ sm + '">'; // col-' + col + '
                to_print += '<img src="data/' + answer[i].id +'.jpg" class="card-img img-fluid img_data ml-auto mr-auto" >'; 
                to_print += '<p class="card-header indigo darken-3 text-white text-center">' + answer[i].Nombre +'</p>';
                to_print += '<p class="card-body text-center">Categoria: ' + answer[i].Categoria + '<br>Cantidad:' +  answer[i].Cantidad  +'<br>Precio:$'+ answer[i].Precio+'</p>';
                to_print += '<button id="'+answer[i].id +'" class="btn btn-blue_ text-white text-center card-footer" onclick="Mostrar_Info(this.id)"><i class="fas fa-shopping-cart"></i> Comprar</button>';
                to_print += '</div>';
                if((y == limit)){
                    to_print += '</div> ';
                    if(Restante > Filas_Res){ 
                       to_print += '<div class="card-deck w-100 mt-5">';
                     }
                    y = 0;
                    } //Y
                }//Else
            }//If
        }
        $("#Inventario").html(to_print); //Imprime los Resultados
        console.log(to_order);
    }
},100);
}//Fin Mostrar_Data();

function Mostrar_Info(id){
      var to_print ="";
      for(i = 0;i<answer.length;i++){
        if(answer[i].id == id){
            to_print += '<div class="col-3"> ' ;
            to_print += '<p></p>';
            to_print += '<i class="fa fa-shopping-cart fa-4x"></i>';
            to_print += '</div>';
            to_print += '<div class="col-9">';
            to_print += '<p>¿Esta Seguro que desea Añadir?</p>';
            to_print +=' <h2>';
            to_print += '<span class="badge">'+ answer[i].Nombre +' x1 $' + answer[i].Precio + '</span>';
            to_print += '</h2>';
            to_print += '</div>';
                     
              }
      }
      document.getElementById('Carrito_Add').innerHTML = to_print;
       // $('#centralModalSuccess').modal('toggle');
    $('#centralModalSuccess').modal('show');
}




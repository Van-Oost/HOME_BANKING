

//Declaración de variables

var nombreUsuario = "Guybrush Threepwood";
    password = 1233;
    saldoCuenta = 100000;
    limiteExtraccion = 15000;
    saldoAnt = 0;

var agua = 350;
    telefono = 425;
    luz = 210;
    internet = 520;

var cuentaAmiga1 = 1234567;
    cuentaAmiga2 = 7654321;




//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    iniciarSesion();
}


//------------------------- Funciones Internas --------------------------


function restarDinero(valor) {
    saldoAnt = saldoCuenta;
    saldoCuenta = saldoAnt - valor;
}

function sumarDinero(valor) {
    saldoAnt = saldoCuenta;
    saldoCuenta = saldoAnt + valor;
}

function esValido(valor) {
    return numeroValido = ((!isNaN(valor))&&(valor>=0))
}

function noEsNumero(valor)  {
    if (valor<0) {
        alert("El importe no puede ser negativo");
    } else {
        alert("Debe ingresar un importe en números.");
    }
}

function noHayDinero() {
    alert("No hay suficiente saldo en su cuenta para completar la operación");
}

function pagarAgua() {
    if (saldoCuenta>=agua) {
        restarDinero(agua, saldoAnt);
        confirmacionPago("Agua", agua, saldoAnt, saldoCuenta);
        actualizarSaldoEnPantalla(saldoCuenta);
    } else noHayDinero();
}

function pagarLuz() {
    if (saldoCuenta>=luz) {
        restarDinero(luz, saldoAnt);
        confirmacionPago("Luz", luz, saldoAnt, saldoCuenta);
        actualizarSaldoEnPantalla(saldoCuenta);
     } else noHayDinero();
}

function pagarInternet() {
    if (saldoCuenta>=internet) {
        restarDinero(internet, saldoAnt);
        confirmacionPago("Internet", internet, saldoAnt, saldoCuenta);
        actualizarSaldoEnPantalla(saldoCuenta);
    } else noHayDinero();
}

function pagarTelefono() {
    if (saldoCuenta>=telefono) {
        restarDinero(telefono, saldoAnt);
        confirmacionPago("Teléfono", telefono, saldoAnt, saldoCuenta);
        actualizarSaldoEnPantalla(saldoCuenta);
    } else noHayDinero();
}

function confirmacionPago(nombreServicio, servicio, saldoAnt,saldoCuenta) {
    alert("Ha pagado el servicio "+nombreServicio+"\nSaldo Anterior: "+saldoAnt+"\nDinero descontado: "+servicio+"\nSaldo Actual: "+saldoCuenta);
}



//-----------------Funciones que tenes que completar

function cambiarLimiteDeExtraccion() {
    var nuevoLimite = parseInt ( prompt ("Ingrese el nuevo límite de extraccón"));
    if (esValido(nuevoLimite)) {
        limiteExtraccion = nuevoLimite;
        actualizarLimiteEnPantalla(limiteExtraccion) 
    } else noEsNumero(nuevoLimite);
}

function extraerDinero() {
    var monto = parseInt ( prompt ("Ingrese monto a retirar"));
    if (esValido(monto)) {
        if ((monto <= saldoCuenta) && (monto <= limiteExtraccion) && (monto % 100 == 0)) {
            restarDinero(monto)
            alert("Ha retirado: "+monto+"\nSaldo Anterior: "+saldoAnt+"\nSaldo Actual: "+saldoCuenta);
            actualizarSaldoEnPantalla(saldoCuenta);
        } else if (monto>saldoCuenta) {
            noHayDinero();
        } else if (monto>limiteExtraccion) {
            alert("La cantidad que desea extraer es mayor a su límite de extracción");
        } else if ((monto%100)!=0) {
            alert("Solo puede extraer billetes de 100");
        }
    } else noEsNumero(monto);
}

function depositarDinero() {
    var monto = parseInt ( prompt ("Ingrese el monto a depositar"));
    if (esValido(monto)) {
        sumarDinero(monto)
        alert("Has depositado:"+" "+monto+"\nSaldo Anterior:"+" "+saldoAnt+"\nSaldo Actual:"+" "+saldoCuenta);
        actualizarSaldoEnPantalla(saldoCuenta)
    } else noEsNumero(monto);
}

function transferirDinero() {
    var monto = parseInt (prompt("Ingrese el monto que desea transferir"));
    if (esValido(monto)) {
        if (monto<=saldoCuenta) {
            var nroCuenta = parseInt (prompt("ingrese el número de cuenta al que desea transferir el dinero."));
            if ((nroCuenta == cuentaAmiga1) || (nroCuenta == cuentaAmiga2)) {
                restarDinero(monto, saldoAnt);
                alert("Ha transferido: "+monto+"\nCuenta destino: "+nroCuenta);
                actualizarSaldoEnPantalla(saldoCuenta);
            } else alert("Solo puede transferirse dinero a una cuenta amiga.");
        } else if (monto>saldoCuenta) {
            noHayDinero();
        }
    } else noEsNumero(monto);
}

function pagarServicio() {
    var servicioElegido = parseInt ( prompt ("Ingrese el número que corresponde al servicio que quiere pagar \n1 - Agua \n2 - Luz \n3 - Internet \n4 - Teléfono"))
    switch (servicioElegido) {
        case 1:
            pagarAgua()
            break;
        case 2:
            pagarLuz()
            break;
        case 3:
            pagarInternet()
            break;
        case 4:
            pagarTelefono()
            break;
        default:
            alert ("No existe el servicio que se ha seleccionado.")
            break;
    }
}

function iniciarSesion() {
    var passIngresado = parseInt (prompt("Ingrese el código de su cuenta."));
    if (passIngresado != password) {
        saldoCuenta = 0;
        alert("Tu dinero ha sido retenido por cuestiones de seguridad.");
        actualizarSaldoEnPantalla(saldoCuenta);
    } else alert("Bienvenido/a "+nombreUsuario+", ya puede comenzar a realizar operaciones.");
}


//Funciones que actualizan el valor de las variables en el HTML

function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
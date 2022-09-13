$(document).ready(function () {
    $.noConflict();
    var countAseguradoras = 1;

    //Petición para obtener las marcas de los vehículos
    $.ajax({
        type: 'GET',
        url: "/Cotizador/ObtenerMarcas",
        data: { },
        success: function (resp) {
            resp.forEach(marca => 
                $("#selectMarca").append($("<option>", {
                    value: marca.MarcaId,
                    text: marca.Nombre
                }))
            );
        },
        error: function (xhr, status, error) { }
    });

    //Evento que detona al seleccionar una marca, para que sea llenado el combo de submarcas

    $("#selectMarca").on('change', function () {

        //Limpiamos los select
        $("#selectSubMarca").empty();
        $("#selectModelo").empty();
        $("#selectVersion").empty();
        $("#tableCostos  thead tr").empty();

        Fuente: https://www.iteramos.com/pregunta/2941/jquery-borrar-todas-las-filas-de-la-tabla-excepto-la-primera
        //Petición para obtener las Submarcas de los vehículos
        $.ajax({
            type: 'GET',
            url: "/Cotizador/ObtenerSubMarcas",
            data: { marcaId: this.value},
            success: function (resp) {
                $("#selectSubMarca").append($("<option value='0' disabled selected>Seleccionar</option>"));
                $("#selectModelo").append($("<option value='0' disabled selected>Seleccionar</option>"));
                $("#selectVersion").append($("<option value='0' disabled selected>Seleccionar</option>"));
                resp.forEach(subMarca =>
                    $("#selectSubMarca").append($("<option>", {
                        value: subMarca.SubMarcaId,
                        text: subMarca.Nombre
                    }))
                );
            },
            error: function (xhr, status, error) { }
        });
    });

    //Evento que detona al seleccionar una Submarca, para que sea llenado el combo de Modelo

    $("#selectSubMarca").on('change', function () {

        //Limpiamos los select
        $("#selectModelo").empty();
        $("#selectVersion").empty();
        $("#tableCostos  thead tr").empty();

        //Petición para obtener las Submarcas de los vehículos
        $.ajax({
            type: 'GET',
            url: "/Cotizador/ObtenerModelos",
            data: { subMarcaId: this.value },
            success: function (resp) {

                $("#selectModelo").append($("<option value='0' disabled selected>Seleccionar</option>"));
                $("#selectVersion").append($("<option value='0' disabled selected>Seleccionar</option>"));
                resp.forEach(modelo =>
                    $("#selectModelo").append($("<option>", {
                        value: modelo.ModeloSubMarcaId,
                        text: modelo.Anio
                    }))
                );
            },
            error: function (xhr, status, error) { }
        });
    });

    //Evento que detona al seleccionar una Submarca, para que sea llenado el combo de Modelo

    $("#selectModelo").on('change', function () {

        //Limpiamos los select
        $("#selectVersion").empty();
        $("#tableCostos  thead tr").empty();

        //Petición para obtener las Submarcas de los vehículos
        $.ajax({
            type: 'GET',
            url: "/Cotizador/ObtenerDescripcion",
            data: { modeloSubMarcaId: this.value },
            success: function (resp) {
                $("#selectVersion").append($("<option value='0' disabled selected>Seleccionar</option>"));
                resp.forEach(modelo =>
                    $("#selectVersion").append($("<option>", {
                        value: modelo.DescripcionId,
                        text: modelo.Descripcion
                    }))
                );
            },
            error: function (xhr, status, error) { }
        });
    });

   //Evento que detona al seleccionar una versión, para que limpie la tabla de cotizaciones
    $("#selectVersion").on('change', function () {
        $("#tableCostos  thead tr").empty();
    });

    //Peticion para obtener la informacion de codigo postal

    $("#inputCP").on('change', function () {

        $("#tableCostos  thead tr").empty();

        if (this.value.length != 5 || isNaN(this.value)) {
            alert("Tu Código Postal es Inválido");
        } else {
            $("#selectColonia").empty();
            $("#selectColonia").append($("<option value='0' disabled selected>Seleccionar</option>"));
            //Petición para obtener datos del CP
            $.ajax({
                type: 'GET',
                url: "https://api-test.aarco.com.mx/api-examen/api/examen/sepomex/" + this.value,
                data: {},
                success: function (resp) {

                    var respJson = JSON.parse(resp.CatalogoJsonString);
                    var colonias = respJson[0].Ubicacion;

                    $("#inputEstado").val(respJson[0].Municipio.Estado.sEstado);
                    $("#inputMunicipio").val(respJson[0].Municipio.sMunicipio)

                    colonias.forEach(colonia =>
                        $("#selectColonia").append($("<option>", {
                            value: colonia.iIdUbicacion,
                            text: colonia.sUbicacion
                        }))
                    );
                },
                error: function (xhr, status, error) { }
            });
        }
    });


    //Boton Cotizar
    $("#buttonCotizar").click(function () {

        $("#tableCostos  thead tr").empty();
        $("#divLoader").css("display", "block");
        $("#buttonCotizar").prop('disabled', true);

        if (!$("#formVivienda").valid() || $("#selectColonia option:selected").val() == 0 || $("#selectVersion option:selected").val() == 0) {
            alert("Faltan Datos en el Formulario");
            $("#tableCostos  thead tr").empty();
            $("#divLoader").css("display", "none");
            $("#buttonCotizar").prop('disabled', false);
        } else {
            $("#tableCostos  tbody").empty();
            var descripcionId = $("#selectVersion option:selected").val();
            $.ajax({
                type: 'POST',
                url: "https://api-test.aarco.com.mx/api-examen/api/examen/crear-peticion",
                data: { DescripcionId: descripcionId },
                success: function (respPost) {
                    if (respPost != "") {
                        obtenerCotizacion(respPost);
                    } else {
                        alert("Error al cargar la información");
                    }
                },
                error: function (xhr, status, error) { }
            });

        }
    });


    function obtenerCotizacion(respPost) {
        var resPost = respPost;
        //Hacemos la petición GET
        $.ajax({
            type: 'GET',
            url: "https://api-test.aarco.com.mx/api-examen/api/examen/peticion/" + resPost,
            data: {},
            success: function (respGet) {

                if (respGet.aseguradoras.length > 0) {
                    var numeroStr = numeral(respGet.aseguradoras[respGet.aseguradoras.length - 1].Tarifa);
                    var numeroMoneda = numeroStr.format('$0,0.00');
                    var htmlTags =
                        '<th> Tarifa: ' + numeroMoneda + ' <img style="width:50%; height:50%;" src="../../Images/' + respGet.aseguradoras[respGet.aseguradoras.length - 1].AseguradoraId + '.png" />' + '</th>';
                }
                if (respGet.PeticionFinalizada == false) {
                    if (respGet.aseguradoras.length == countAseguradoras) {
                        if (respGet.aseguradoras.length > 0) { $('#tableCostos thead tr').append(htmlTags); }
                        countAseguradoras++;
                    }
                    obtenerCotizacion(resPost);
                } else {
                    $("#divLoader").css("display", "none");
                    $("#buttonCotizar").prop('disabled', false);

                    $('#tableCostos thead tr').append(htmlTags);

                    countAseguradoras = 0
                };
            },
            error: function (xhr, status, error) { }
        });
    }

});
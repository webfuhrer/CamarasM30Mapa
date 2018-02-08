var lista_objetos_posicion_imagen=new Array();
$(document).ready(
        function()
            {
                    //Hacer peticion
                    $.get("http://www.mc30.es/components/com_hotspots/datos/camaras.xml",
                        function (datos, estado_respuesta, xhr)
                        {
                            //Cuando haya respuesta, parsear la peticion
                               lista_objetos_posicion_imagen= parsearDatos(datos);
                               
                               //Pintar el mapa con los marcadores
                               pintarMapa(lista_objetos_posicion_imagen);
                        }
                       );
                    
                    
            }
        );
function pintarMapa(lista_objetos_posicion_imagen)
{
   // crearé el mapoa
   //40.420180, -3.72040
   var posicion_centro={lat: 40.420180, lng: -3.72040}
    var map = new google.maps.Map(document.getElementById('mapa'), {
          zoom: 11,
          
          center: posicion_centro
        });
    for (i=0; i<lista_objetos_posicion_imagen.length; i++)
    {
        latitud=lista_objetos_posicion_imagen[i].lat*1;
        longitud=lista_objetos_posicion_imagen[i].lng*1;
        url=lista_objetos_posicion_imagen[i].url;
        //aqui crare los marcadopres
         var marker = new google.maps.Marker({
          position: {lat: latitud,lng:longitud},
           animation: google.maps.Animation.DROP,
         title: 'Cámara '+i
        });
        marker.setMap(map);
        marker.addListener('click', function()
        {
            clicadoMarcador(this.title);
        });
    }
}
function clicadoMarcador(titulo_marcador)
{
   var id_marcador=titulo_marcador.replace('Cámara ','');
   
   obj_camara=lista_objetos_posicion_imagen[id_marcador];
   url_imagen=obj_camara.url;
   $("#imagen").attr("src",url_imagen );
}
function parsearDatos(xml)
{
    var lista_auxiliar=new Array();
    lista_camaras=xml.getElementsByTagName("Camara");
    for(indice_camara=0; indice_camara<lista_camaras.length;indice_camara++)
    {
        camara=lista_camaras[indice_camara];
        objeto_posicion=camara.getElementsByTagName("Posicion")[0];
        objeto_latitud=objeto_posicion.getElementsByTagName("Latitud")[0];
        objeto_longitud=objeto_posicion.getElementsByTagName("Longitud")[0];
        latitud=objeto_latitud.childNodes[0].nodeValue;
        longitud=objeto_longitud.childNodes[0].nodeValue;
        console.log("latitud: "+latitud+" longitud: "+longitud);
        objeto_url=camara.getElementsByTagName("URL")[0];
        url=objeto_url.childNodes[0].nodeValue;
        
        lista_auxiliar[indice_camara]={lat: latitud, lng: longitud, url:'http://'+url};
    }
    return lista_auxiliar;
}
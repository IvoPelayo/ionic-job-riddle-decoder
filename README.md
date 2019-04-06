# ionic-job-riddle-decoder
Aplicación de Ionic 2 desarrollada para decodificar un acertijo.
 

Este programa fue desarrollado brevemente para resolver el acertijo publicado en la siguiente búsqueda laboral:

https://www.computrabajo.com.ar/ofertas-de-trabajo/oferta-de-trabajo-de-programadores-resolve-el-desafio-en-rosario-FC2CAC0153C6CFB161373E686DCF3405?utm_source=Email&utm_campaign=auto_cand_alertacargosdiaria&utm_medium=auto_cand_alertacargosdiaria_titel_1

# Metodologia utilizada para resolver el acertijo:

Al no tener ningún tipo de información sobre el lenguaje del texto encriptado, el primer movimiento es conocer la distribución de probabilidad de caracteres en el mismo: " ΨΔΣΞλϑΛΦϗϖΠαΘβμξζφΩΓηΡε"

Conociendo esto, se eligen algunas distribuciónes de probabilidad a modo de punto de partida: Español, Ingles, QWERTY. Esta lista podría continuar con distribuciones de tipo Latin, Griego u otros.

A partir de una distribución base, se arma todas las combinaciones equivalentes en un listado que permite alterar el orden de las letras de la base seleccionada.

A partir de esto es simplemente prueba y error, tomando como punto de partida de las combinaciones las palabras que pueden identificarse a simple vista (articulos, palabras con errores de solo un caracter). A medida que se alteran las combinaciones el texto resultante va adquiriendo coherencia. En caso de empeorar el resultado se tiene un botón para volver atras los movimientos (en el toolbar). Un cambio de distribución base reinicia todo el juego y sus movimientos previos.

Todo la logica de la aplicación puede observarse en la clase [HomePage](https://github.com/ivoPelayo/ionic-job-riddle-decoder/tree/master/src/app/home/hom.page.ts), junto a las siguientes modelos utilizados: [Models](https://github.com/ivoPelayo/ionic-job-riddle-decoder/tree/master/src/app/models/)

# Resultado:

Utilizando la distribución del idioma Español como base, y realizando algunos ajustes (12 en total), se puede observar como resultado una canción de Atahualpa Yupaanqui (También conocido por ser interpretado por la banda Divididos), con algunos errores menores (dice "par" en vez de "por"):

Texto: en las arenas bailan los remolinos el sol juega en el brillo del pedregal y prendido a la magia de los caminos el arriero va el arriero va es bandera de niebla su poncho al viento lo saludan las flautas del pajonal y animando la tropa par esos cerros el arriero va el arriero va las penas y las vaquitas se van par la misma senda las penas son de nosotros las vaquitas son ajenas

Distribución resultante: aelsornidpvmutbjgycqhf

# Instrucciones

1- Clonar repo: 

```
git clone https://github.com/IvoPelayo/ionic-job-riddle-decoder
```

2 - Instalar ionic y cordova:

```
\[sudo] npm i -g ionic

\[sudo] npm i -g cordova
```

3- Instalar dependencias: 

```
\[sudo] npm install \[--save --save-dev] \[--unsafe-perm]
```

*En caso de errores con linux probar parámetros adicionales.

En caso que la libreria node-sass genere problemas:

```
\[sudo] npm rebuild node-sass
```

Ejecutar en navegador:

```
ionic serve
```

A jugar!

** Creado por Ivo Pelayo Perpiñá

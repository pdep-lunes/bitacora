---
title: Segunda Clase - Objetos
date: '2019-08-12'
description: Polimorfismo, responsabilidad y encapsulamiento. Testing.
tags: [objetos, polimorfismo, responsabilidad, encapsulamiento, testing]
---

## Tarea :coffee:

- **Mumuki:** lecciones 3 a 5.

## Clase

Trabajamos con [este](https://docs.google.com/document/d/1t7vm0-YKoMfT6ZwK1cq0y210GUOzhYM1vAoy3orDniE/edit?usp=sharing) ejercicio :truck:.  
La solución la podés encontrar en nuestro [repo](https://github.com/pdep-lunes/objetos-2019/tree/master/clase2) de Github :wink:.

### Responsabilidad

En el paradigma de objetos nuestra forma de abstraer comportamiento es a través de métodos, y su reutilización es muy simple.
En objetos tenemos dos tipos grandes de responsabilidades:

- Qué **objetos** tienen qué responsabilidad
- Qué **métodos** dentro de un objeto tienen qué responsabilidad. Es común la tentación de querer hacer todo en un mismo método, pero la reutilización de código en objetos es extremadamente común e importante.

En nuestro ejemplo:

- _A nivel objetos:_ los camiones tienen la responsabilidad de saber calcular su peso, velocidad máxima y cómo pasar por una ruta. El puesto tiene la responsabilidad de saber cúanto y cómo cobrarle a `pdepCargas`.
- _A nivel métodos dentro de un objeto:_ el puesto podría tener un método `precioCobradoPara(unCamion)` que se encargue de la lógica de calcular el precio que va a cobrar. De esta forma, estamos creando una nueva abstracción que hasta le podemos encontrar un buen nombre :grinning:!!

### Encapsulamiento

El encapsulamiento nos sirve para separar las responsabilidades de cada objeto.

> Cada objeto es el responsable de su propio estado (atributos).

Esto nos sirve para no acoplar objetos, cosa que se ve en profundidad en diseño.  
En nuestro ejemplo: al puesto rutatlántica le dice al camión ganadero que recorra la ruta, pero él no le aumenta el kilometraje. Porque el kilometraje el kilometraje es parte del estado interno del camión. Y si hiciera eso estaría rompiendo el encapsulamiento lo cual está muy MAL.

### Polimorfismo

Ya conocemos esta palabra desde lógico y en objetos va a ser algo muy importante.
Repasemos las partes necesarias para que haya polimorfismo.

- Un objeto que trata indistintamente a otros objetos, es decir los usa _polimórficamente_. Y hace esto mandándoles los mismos mensajes. En nuestro caso el `puestoRutatlántica` usa polimórficamente a los camiones.
- Al menos 2 objetos que son utilizados polimórficamente por un tercero. Y además esos objetos entienden los mismos mensajes, es decir, comparten la misma interfaz.
- Tiene que tener sentido desde el punto de vista del dominio.

> Para que 2 o más objetos puedan ser utilizados polimórficamente por otro, estos deben entender los mismos mensajes :speech_balloon:. Es decir, tienen que tener la misma **interfaz**.

## Testing

Hasta ahora en Wollok para probar nuestro programa estábamos usando la REPL :computer:. Pero esto no está tan bueno :confused: porque estamos probando siempre _a mano_ nuestro código y cada vez que realizamos un cambio a nuestro código deberíamos volver a probar que lo que modificamos siga funcionando como esperábamos. Entonces, nuestro código se volvería poco mantenible y nos provocaría problemas en el futuro :collision:.

Para evitar esto vamos a buscar automatizar nuestros tests. Hay diferentes herramientas para realizar esto y dependen del lenguaje que estemos utilizando. Por ejemplo: en _Haskell_ podemos usar _HSpec_.  
En Wollok contamos contamos con la posibilidad de hacer tests automatizados de manera nativa.

Cada test que hagamos va a probar una cierta funcionalidad. Esto es importante porque cada uno de nuestros casos de prueba va a ser **unitario**.  
Además la ejecución de cada test debe ser **independiente** de las otras.

> Que las pruebas sean automatizadas nos permite que sean fácilmente repetibles. Entonces podemos asegurarnos de que luego de realizar un cambio nuestro código sigue andando como esperábamos. :cool:

En cada un caso de prueba partimos a partir de un estado que conocemos. Luego, realizamos la operación que queremos probar. Y finalmente realizamos una _aserción_ de cómo debería quedar cierto estado luego de realizar la prueba. O bien de qué debería devolvernos.

## Links útiles :earth_americas:

- **Wiki:** [polimorfismo](http://wiki.uqbar.org/wiki/articles/polimorfismo-en-el-paradigma-de-objetos.html), [encapsulamiento](http://wiki.uqbar.org/wiki/articles/encapsulamiento.html), [responsabilidades y delegación](http://wiki.uqbar.org/wiki/articles/modelando-objetos---responsabilidades-y-delegacion.html).
- **Apuntes de testing en Wollok:** [Introducción al Testeo Unitario Automatizado](https://docs.google.com/document/d/1Q_v48gZfRmVfLMvC0PBpmtZyMoALbh11AwmEllP__eY/edit), [Testeo unitario automatizado avanzado](https://docs.google.com/document/d/1caDE_mlP1QMfzyVpyvh-tKshjAeYLXBkXDYrTX5zFUI/edit#?usp=drive_web).

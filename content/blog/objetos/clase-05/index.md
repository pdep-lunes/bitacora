---
title: Quinta Clase - Objetos
date: '2019-09-09'
description: Clase de clases.
tags: [objetos, clases]
---

## Ejercitación de ejemplo

https://docs.google.com/document/d/1I6IfZYw6cDdAl0aA9KrnnZHfGVLdwWJQ9ERwWoo6l5U/edit

## Clases

Cuando nos encontramos con que varios objetos repiten lógica nos encontramos ante la necesidad de abstraer la misma de alguna forma, tal que todos puedan reutilizarla. El paradigma orientado a objetos nos provee un mecanismo para resolver esa repetición, las clases.

### Cosas a mencionar:

Todo objeto es siempre instancia de una y sólo una clase.
No se puede cambiar la clase de un objeto una vez instanciado.

## Constructores e instanciación

Si definimos una clase y queremos crear un objeto a partir de la misma para poder mandarle mensajes necesitamos instanciarlos. O sea que la clase tiene un segundo rol importante, no sirve sólo para definir el comportamiento y los atributos, también sirve para crear los objetos que luego usaremos en nuestro programa.
Puede perfectamente instanciarse un objeto a partir de una clase y no preservarlo en una variable, siempre depende de las necesidades de uno. Por ejemplo podría crearse un objeto dentro de un método y retornarlo directamente, o crearlo para mandarle un mensaje directamente.

## Intro method look up

Cuando nosotros le enviamos un mensaje a un objeto, ahora se fija si está declarado en la clase a la cual pertenece.

## Diagrama de clases

Para hacer un diagrama de clases, representamos a las entidades (well-known objects y las clases) como recuadros con 3 secciones:

- Una cabecera con el nombre (y una aclaración del estilo << O >> si es un objeto y no una clase)
- Un segundo recuadro con las variables más importantes
- Un último recuadro con los métodos más importantes

Y para asociar estas entidades vimos la flecha de "tiene"

![Flecha Tiene](./uml-tiene.png 'Flecha Tiene')

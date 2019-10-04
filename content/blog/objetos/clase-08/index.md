---
title: Excepciones
date: '2019-09-30'
description: Clase de excepciones.
tags: [objetos, excepciones]
---

# Introducción

Cuando ejecutamos un programa, pueden ocurrir problemas que hacen que éste no se comporte de la manera la cual nosotros esperábamos. En otras palabras, pueden ocurrir **errores.** ¿Qué deberíamos hacer ante un error?

Si nosotros ignoramos el error, se puede convertir en una _bola de nieve_ y desencadenar en otros errores, que pueden ser peores :fire:. Por lo tanto, lo mejor que podemos hacer es **fallar**. Una forma de lograr esto es mediante el uso de **excepciones**.

# Excepciones

Una excepción es una indicación de que algo salió mal en la ejecución nuestro programa.

¿Y cómo las podemos utilizar en Wollok?
Hay dos maneras de hacerlo:

- Usando el mensaje `error`, el cual entienden los objetos y nos sirve para lanzar una excepción:

```java
self.error("mensaje del error")
```

- Usando throw y la clase `Exception`:

```java
 throw new Exception(message = "mensaje del error")
```

También podemos crear nuestras propias excepciones :wink:. Para esto podemos crear una clase que herede de `Exception`. Esto nos va a ser útil más adelante.:

```java
class ExcepcionParticularDelPrograma inherits Exception {}
```

y la tiramos como antes:

```java
throw new ExcepcionParticularDelPrograma(message = "mensaje del error")
```

Además, es importante que nuestros mensajes de excepción sean expresivos. Así si algo rompe :boom: sabremos por qué :grinning:.

Ahora, todo bien, pero ¿para qué me sirven en la ejecución del programa? ¿Qué hacen?

```java
class Rick{
  method aumentarDemencia(unaCantidad) {
    if (nivelDeDemencia + unaCantidad > 100)
      throw new EstoyReDementeException()
    nivelDeDemencia += unaCantidad // nunca será ejecutado si se entra al if anterior
  }
}
```

Luego de tirar la excepción se corta la ejecución del programa. Además, decimos que las excepciones _burbujean_ por lo que si otro objeto llamó a `aumentarDemencia` de un Rick y ese método lanza la excepción, también cortará el flujo de ejecución para ese objeto.

Entonces, ¿si lanzamos una excepción esta _subirá_ indefinidamente? Bueno, en realidad no, porque si esto pasara cada vez que se lanza una excepción terminaría nuestro programa. Así que ahora veremos una forma de manejar excepciones ...

# Atrapando Excepciones

Cuando sabemos qué hacer ante una excepción, tenemos la opción de **atrapar** la excepción y utilizar otro código que se tiene que ejecutar si ocurrió tal excepción. :confetti_ball:  
En wollok, esto se realiza de la siguiente forma:

```java
try {
	// código que puede fallar
} catch e : ExcepcionQueQuieroAtrapar {
	// código a ejecutar si ocurre ExcepcionQueQuieroAtrapar
}
```

Algo a notar, es que la excepción a atrapar tiene que ser **la que quiero atrapar y lo menos general posible.** Si atrapo, por ejemplo, `Exception`, seguramente esté atrapando errores que no hubiese querido atrapar (Por ejemplo, división por cero).

## Tarea

- Mumuki: [Lección 9](https://mumuki.io/pdep-utn/lessons/91-programacion-con-objetos-excepciones)

## Links útiles

- [Wiki excepciones](http://wiki.uqbar.org/wiki/articles/excepciones.html)
- [Apunte](https://docs.google.com/document/d/1T87tmdXv_39RoE_zR7alVFK8TUl-KJYOhdoIsoVTRb4/edit#) de excepciones
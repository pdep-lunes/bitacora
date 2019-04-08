---
title: Segunda clase
date: '2019-03-25'
description: 'Introducción a Funcional. Composición, Precedencia de Operadores, primera parte de Tipado.'
tags: [funcional, composicion, tipado, precedencia-de-operadores, inmutabilidad]
---

## Tarea para la clase que viene

- **¡Hacer parejas para los trabajos practicos que ya se vienen!**🙆‍♀️🙆‍♂️

- **Hacer las lecciones 1 a 4 (inclusive) del capítulo 1 de [Mumuki](https://mumuki.io/pdep-utn)**

## ¿Qué empezamos viendo hoy?

Repasamos lo que vimos la clase pasada (los conceptos de **declaratividad** y **expresividad**, **abstraccion**, **delegacion**), y arrancamos con el paradigma **Funcional** y Haskell.

## ¿Y qué es el paradigma funcional?

En el paradigma funcional veremos y trabajaremos, justamente, con el concepto de **_funciones_** 😅. Y como las funciones de análisis matemático, las funciones tienen dos propiedades importantes: **existencia** y **unicidad**. Estas propiedades también se respetan en Haskell. 😮

## Valores y Funciones

En Haskell, podemos definir valores, como también funciones:

```haskell
billetera = 100
-- Los valores pueden ser booleanos, enteros, strings, etc.

comprarAgua unaBilletera = unaBilletera - 30
```

Las funciones van a ser nuestra herramienta para poder operar sobre los valores. Si yo en la consola de Haskell escribo:

```haskell
> comprarAgua billetera
=> 70
```

Y algo muy importante: **en Haskell no hay efecto**. Esto quiere decir que, los valores igualados no van a mutar luego de ser operados por las funciones (Este concepto se llama **_inmutabilidad_**).

Por ejemplo, si aplicamos `comprarAgua` a `billetera`, podemos ver que `billetera` no cambia su valor:

```haskell
> billetera
=> 100
> comprarAgua billetera
=> 70
> billetera
=> 100
```

Por esto, es que en haskell logramos tener lo que se llama **Transparencia Referencial**.

## Composición

Supongamos que, como vimos en clase, tenemos esta otra funcion:

```haskell
ganarLoteria unaBilletera = unaBilletera + 1000
```

Ahora, quiero que en la billetera se vea que haya ganado la loteria y que me compré un agua. ¿Cómo se hace?

Pues podemos utilizar la **composicion** de funciones:

```
> (comprarAgua.ganarLoteria) billetera
=> 1070
```

Lo que está ocurriendo acá es lo mismo que con la composición de funciones matemáticas ( _FoG(x)_ ). Primero se aplica la función de la derecha con el valor, y luego se aplica la de la izquierda con el valor que nos devolvió la función anterior.

Recordemos que, como en matemática, el valor que retorne la función de la derecha, tiene que ser **un valor que la función de la izquierda pueda operar**.

Por ejemplo, si tenemos esta nueva función:

```Haskell
esRico unaBilletera = unaBilletera > 1000
```

y la intento componer así:

```
> (ganarLoteria.esRico) billetera
```

Haskell nos va a decir que esta mal, ya que ganarLoteria tiene que recibir un numero, y esta recibiendo un booleano.

La version correcta seria asi:

```
> (esRico.ganarLoteria) billetera
```

Lo que nos queda después de componer dos funciones es una **nueva funcion**

tambien las podemos definir:

```haskell
ganarLoteriaYComprarAgua = comprarAgua.ganarLoteria
-- Notacion Point-Free, podemos ignorar parametros cuando las funciones
-- esperan ese mismo parametro (En este caso, la billetera).
```

## Precedencia de Operadores

En matemática, cuando tenemos una expresión como 2 \* 3 + 4, solemos operarla dependiendo de la precedencia de cada operador. Como el \* es de mayor precedencia que el +, operamos primero 2 \* 3 y luego le sumamos 4.

En haskell también se respeta esto. Les dejamos una tabla para que puedan ver la precedencia que utiliza Haskell:

| Precedencia (Mayor numero, mayor precedencia) |            "Operador"            |
| --------------------------------------------- | :------------------------------: |
| 10                                            | Aplicacion Normal de una Funcion |
| 9                                             |                .                 |
| 8                                             |                ^                 |
| 7                                             |               \*,/               |
| 6                                             |               +,-                |
| 5                                             |                :                 |
| 4                                             |       ==, /=, <, <=, >, >=       |
| 3                                             |                &&                |
| 2                                             |               \|\|               |
| 1                                             |                \$                |

## Tipado

un **tipo** es un conjunto de valores, a los cuales uno puede operar con un conjunto de funciones (Que entienden esos valores). Se puede pensar como en las funciones matemáticas y los dominios de una función.

por ejemplo, los tipos de las funciones que utilizamos anteriormente serían:

```haskell
billetera :: Int

comprarAgua :: Int -> Int


ganarLoteria :: Int -> Int

esRico :: Int -> Bool
```

Ahora, **Para qué nos sirve tipar?**

Nos sirve para que, solo mirando el tipado de una función y el nombre de ésta (Y con una buena expresividad), podamos inferir que es lo que la función hace. También, es una gran forma de validar que lo que estamos pensando está bien. (Aparte, en el examen vamos a pedir que tipen las funciones, asi que ojo con esto!)

## Algunas funciones que vimos en clase

- even: Dado un numero, devuelve si este es par

```haskell
> even 2
=> True
```

- odd: Dado un numero, devuelve si este es impar

```haskell
> odd 2
=> False

```

- id: Dado un valor, devuelve ese mismo valor

```haskell
> id "Hola!"

=> "Hola!"

```

- (\$): Dada una funcion y un valor, devuelve el valor que es la aplicacion de la funcion al valor

```haskell
> even $ 2

=> True

```

Sirve mucho para deshacernos de paréntesis. por ejemplo, para las composiciones:

```haskell
> (comprarAgua.ganarLoteria) billetera
-- es equivalente hacer
> comprarAgua.ganarLoteria $ billetera
```

Esto ocurre gracias a la precedencia del \$.

## Links Útiles

- [Concepto de función](http://wiki.uqbar.org/wiki/articles/concepto-de-funcion.html)
- [Composición](http://wiki.uqbar.org/wiki/articles/composicion.html)

---
title: Sexta clase
date: '2019-04-22'
description: 'Listas infinitas, Lazy evaluation, Expresiones lambda'
tags: [funcional, listas-infinitas, lazy-evaluation, expresiones-lambda]
---

## Tareas para la clase que viene:

Leer este [apunte](https://docs.google.com/document/d/1jSrU7lVMan4nbHBETGqvO5VpqJI0KXVWtH7fqnVASPU/edit) ya que es en lo que nos vamos a basar en la clase y lo daremos como leído.

## ¿Qué vimos hoy?

- Listas infinitas
- Lazy evaluation lazy vs eager
- Expresiones lambdas

## Listas infinitas

Ya vimos que en Haskell podríamos modelar una biblioteca 📚 con las listas, por ejemplo:

```haskell
biblioteca = [
  "Carrie",
  "Fundación",
  "El visitante",
  "Harry Potter y príncipe mestizo"
  ]
```

Y también podemos modelar una lista del 1 al 5:

```haskell
unoAlCinco = [1,2,3,4,5]
```

Pero… ¿si quisiéramos hacer una lista del 1 al 1000? 💭 ¡¿Deberíamos escribir mil veces los números?! 😱 Por suerte, nuestro gran amigo Haskell puede ayudarnos con esto con las _listas por rangos_:

```haskell
unoAlMil = [1..1000]
```

También podemos definir una lista de los números pares entre 1 y 100 de esta forma:

```haskell
paresAlCien = [2,4..100]
```

Y no solo sirve para números 🔢, sino también para letras 🔡:

```haskell
abecedario = ['a'..'z']
```

Y así como podemos definir listas con límites o con rangos, también podemos tener… 🥁 ¡**listas infinitas**!

```haskell
infinita = [1..]
```

(Si lo probaste en la consola y no sabés cómo hacer para que pare 😰, apretá **ctrl + c**).

## Lazy evaluation

Sabemos aplicar la función ´head´ a una lista:

```haskell
head ["hola", "como", "estás?"]
> "hola"
```

Pero, ¿qué pasará con una lista infinita? 😮

```haskell
head [1..]
> 1
```

Por si quedan dudas de qué es lo que acaba de pasar, sí, Haskell no esperó a que terminara la lista sino que tomó directamente lo que necesitaba. Eso es porque su forma de evaluar expresiones es **perezosa**, del inglés **lazy evaluation**. A comparación de otros lenguajes que ya conocés donde la evaluación es **ansiosa**, del inglés **eager evaluation** y, por ejemplo, esperarían terminar de evaluar la lista antes de obtener el primer element (al ser una lista infinita esa tarea no terminaría nunca 😬).
Sipi, Haskell es lo más. 😍

Ahora, ¿cómo funciona lazy evaluation?
Este tipo de evaluación se basa en una _estrategia_ que se llama **call-by-name**...¿quejesto? 😅
La idea es evaluar primero las expresiones que están "más afuera" y luego continuar evaluando "hacia dentro". Es decir, las funciones se aplican antes de que se evalúen los parámetros. 😎
Si volvemos al ejemplo anterior:

```haskell{2}
head [1..]
-- aplicará primero head, antes que evaluar la lista infinita
> 1
```

Ahora, hay funciones con las cuales se evaluan primero los parámetros, antes que la función en sí:

```haskell{4,5}
(*) (2+3) 5
(2+3) * 5

-- (*) necesita que sus parámetros sean números para poder evaluar,
-- entonces se evalúa primero (2+3).

5 * 5
> 25
```

A la estrategia de evaluar primero las expresiones "de adentro" para luego pasar el resultado/valor a las funciones "de afuera" la llamamos **call-by-value**. Esta es la estrategia en la que se basa la evaluación ansiosa o **eager evaluation**.

```haskell{8}
head [1..]
-- espera a que termine la lista infinita (nunca 😝)
head [1,2..]
-- espera a que termine la lista infinita (nunca 😝)
head [1,2,3..]
-- espera a que termine la lista infinita (nunca 😝)
head [1,2,3,4..]
-- … y así hasta el infinito de los tiempos ⏳. ¡No termina!
```

Les dejamos otros casos para que piensen (y si quieren, le manden a su tutor o tutora la respuesta) :

- ¿terminarán de evaluar con lazy evaluation?
- ¿y con Eager Evaluation?
- ¿qué nos devuelve? 🤔

```haskell
take 15 [1,3..]

last [1..]

length [1..]

sum [3, 6..3*10]

any even [2, 4..]

head (filter (3<) [1..])

head (filter (<0) [1..])
```

## Expresiones lambdas:

Imaginemos que queremos hacer una función que nos diga si un lugar (del cual conocemos su nombre y su año de creación) es muy frecuentado. Esto se cumple si tiene un nombre que empieza con 'a' y termina con 'z'.
Podríamos hacer algo así:

```haskell
data Lugar = Lugar {
  nombre :: String,
  añoDeCreacion :: Int
}

empiezaConA :: String -> Bool
empiezaConA = (=='a').head

terminaConZ :: String -> Bool
terminaConZ = (=='z').last

empiezaConAYTerminaConZ :: String -> Bool
empiezaConAYTerminaConZ nombre = empiezaConA nombre && terminaConZ nombre

esMuyFrencuentado :: Lugar -> Bool
esMuyFrencuentado = empiezaConAYTerminaConZ.nombre
```

¡Esto solucionaría el problema! Pero…

Tenemos una función (empiezaConAYTerminaConZ) que muy probablemente no utilizaremos dentro de nuestro código, ya que es muuuuy específica para resolver este problema 😅. ¿Qué podríamos hacer? 😮

¡Habemus **expresiones lambdas**!

Haskell nos permite crear funciones que, como programadores y programadoras, sabemos que son específicas para esa función y _solo utilizaremos en esa parte del código_. Por eso es que también se las llama **funciones anónimas** porque no tienen nombre.

¿Y cómo son las expresiones lambda?
Volviendo al ejemplo:

```haskell{7,8,9,10}
empiezaConA :: String -> Bool
empiezaConA = (=='a').head

terminaConZ :: String -> Bool
terminaConZ = (=='z').last

esMuyFrencuentado :: Lugar -> Bool
esMuyFrencuentado = (\unNombre ->
  empiezaConA unNombre &&
  terminaConZ unNombre).nombre
```

Algo a tener muy en cuenta es que las expresiones lambda **solo se pueden usar una vez** en nuestro código. ¿Es un capricho? No. Usarla más de una vez implica que esa función es algo que debemos abstraer y ponerle nombre.

Y sí, como cualquier función podemos componerla, pasarla como parámetro o aplicarla parcialmente.

## Links útiles:

- [Listas infinitas](http://wiki.uqbar.org/wiki/articles/estrategias-de-evaluacion.html#tocAnchor-1-7-4)
- [Lazy evaluation](http://wiki.uqbar.org/wiki/articles/estrategias-de-evaluacion.html#tocAnchor-1-7)
- [Estrategias de evaluación](http://wiki.uqbar.org/wiki/articles/estrategias-de-evaluacion.html)
- [Expresiones lambdas](http://wiki.uqbar.org/wiki/articles/expresiones-lambda.html)

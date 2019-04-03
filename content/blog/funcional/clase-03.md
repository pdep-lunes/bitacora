---
title: Tercera clase
date: '2019-04-01'
description: 'Listas, Typeclasses y Aplicacion Parcial'
tags: [funcional, composicion, tipado, listas, typeclasses, aplicacion parcial]
---

## Qué vimos hoy?

1. Listas
2. Typeclasses
3. Aplicaccion parcial
 
## Listas

Una lista en haskell es una estructura de datos homogenea que nos va a ser muy util para almacenar elementos del mismo tipo. Es decir nosotros podemos crear una lista de Int, una lista de Char, una lista de Float, etc, pero nunca una lista donde hayan elementos de diferente tipo.

```
[1,2,3] => Bien
['h','o','l','a'] => Impecable
[1,"gus", True] => Explota todo
```

Al incorporar el concepto de listas nos dimos cuenta que en realidad el tipo de dato String no es mas que una equivalencia a una lista de caracteres [Char].

```
> "Messi" == ['M', 'e', 's', 's', 'i']
=> True
```

Vimos algunas operaciones simples, sin efecto, sobre listas

```
> length [1,2,3]
=> 3

> head [1,2,3]
=> 1

> take 3 "pdpep"
=> "pdp"
```

##Typeclasses

Una typeclass es una nueva forma de agrupar diferentes tipos de datos. En base a que vamos a agrupar? En base a operaciones basicas, es decir todos los tipos de datos que formen parte de una typeclass van a tener que si o si responder ante ciertas opreaciones, definiendo asi un conjunto de elementos que va a comportarse de una manera.

Haskell cuenta con muchas typeclasses, pero en particular nos interesan las siguientes:
- `Num`
- `Ord`
- `Eq`
- `Show`

**Num**

Todos los tipos de dato numericos, ellos van a soportar opreaciones como la suma y la multiplicacion.

**Ord**

Agrupa tanto a Num como a todos ordenables, es decir tipos de dato que soporten operaciones como `(>) (>=) (<) (<=)`

**Eq**

Esta typeclass engloba a Ord y a los elementos que son equiparables, en otras palabras, agrupa a los tipos de dato que soportan comparaciones por igualdad `(==) o (/=)`

**Show**

Pertenecen a la typeclass Show aquellos tipos de datos que pueden ser mostrados, soportando asi la opreacion `show`. Entonces en esta familia estamos excluyendo a las funciones, ya que uno no pude hacer `show head`

```
> show 1
=> "1"

> show True
=> "True"

> show "Hola"
=> "Hola"

> show head
=> No es parte de Show, por ende falla el chequeo de tipos y rompe
```

**Diagrama de typeclasses**

Estuvimos hablando sobre typeclasses que engloban a otras, lo cual nos trae como consecuencia el siguiente diagrama

![alt text](./../../assets/Tipos%20de%20Haskell.jpg "Logo Title Text 1")


**Tipando con typeclasses**

Ahora que tenemos el concepto de typeclass vamos a poder tipar funciones de una forma mas precisa.

```
 (Typeclass1, Typeclass2...) => Variable de tipo1 -> Variable de tipo2... 
```

Por ejemplo vamos a tipamos la funcion `sum`, la cual toma una lista y devuelve la suma de los elemento dentro de la lista

```
sum :: (Num a) => [a] -> Int
```

Es decir, vamos a tomar una lista de elementos que pertenezcan a la typeclass **Num** y vamos a retornar un valor entero.

Otra funcion de listas muy util que vimos es la funcion de pretenecia, `elem`, la cual no inidca si un elemento pretenence a una lista o no. 

```
elem :: (Eq a) => a -> [a] -> Bool
```

Otro tipado interesante es el de la funcion max

```
max :: (Ord a) => a -> a -> a
```

Esta funcion nos indica cual de los dos elementos ingresados es mayor, pero tiene una restriccion, ambos elementos tienen que ser ordenables, es decir tienen que pertencer a la typeclass Ord ya que la operacion (>) va a tener que aceptar a ambos elementos.

Otra firma un poco mas compleja podria ser la siguiente

```
foo :: (Num a, Eq b) => a -> b -> Bool
```

En esta firma vemos que podemos hacer diferentes restricciones de typeclass: **a** es **Num** mientras que **b** es un **Eq**.


##Aplicacion Parcial  

Recordemos que teniamos las siguientes `notasDeGus = [4,4,4,6,8]`

Queriamos hacer una funcion `alterarNota` que nos retorne la primera nota multiplicada por dos. Una de las soluciones propuestas fue la siguiente:

```
 alterarNota notas = head notas * 2
```

Pero luego introdujimos el concepto de aplicacion parcial

```
 alterarNota notas = ((*2).head) notas
```

Decimos que una funcion esta parcialmente aplicada cuando estamos proveyendo menos parámetros que los que esta requiere.
 
En este caso la funcion `(*)` esta siendo parcialmente aplicada ya que le estamos pasando solo un parametro: el resultado de aplicar la funcion `head` a `notas`

El resultado de aplicar parcialmente una función es otra función que espera menos parámetros que la original.

Otra funcion donde utlizamos aplicacion parcial fue en `promedioDeGus`

```
promedioDeGus notas = ((/length notas).sum) notas
``` 

**Currificacion**

Cuando hablamos de currificación nos referimos a que todas las funciones reciben un único parámetro como máximo. El hecho de que sea posible definir funciones de más de un parámetro se debe a que son funciones currificadas. Cuando evaluamos por ejemplo, max 4 5, lo que sucede es que se le aplica el número 5 a la función resultante de aplicarle el 4 a max, o sea que se transforma en (max 4) 5

```
max :: (Ord a) => a -> a -> a <— Forma tradicional

max :: (Ord a) => a -> (a -> a) <— Forma currificada
``` 

## Links Útiles

- [Listas](http://aprendehaskell.es/content/Empezando.html#una-introduccion-a-las-listas)
- [Typeclasses](http://wiki.uqbar.org/wiki/articles/typeclasses.html)
- [Typeclasses extendido](http://aprendehaskell.es/content/Tipos.html#clases-de-tipos-paso-a-paso-1a-parte)
- [Aplicacion Parcial](http://wiki.uqbar.org/wiki/articles/aplicacion-parcial.html)
- [Currificacion](http://wiki.uqbar.org/wiki/articles/currificacion.html)

---
title: Tercera clase
date: '2019-04-01'
description: 'Listas, Typeclasses y Aplicacion Parcial'
tags: [funcional, tipado, listas, aplicacion-parcial]
---

## ¿Qué vimos hoy?

1. Listas
2. Typeclasses
3. Aplicaccion parcial

## Listas

Una lista en haskell es una estructura de datos homogénea que nos va a ser muy útil para almacenar elementos del **mismo tipo**. Es decir, nosotros podemos crear una lista de `Int`, una lista de `Char`, una lista de `Float`, etc, pero nunca una lista donde hayan elementos de diferente tipo.

```haskell
[1,2,3] => Bien ✔️
['h','o','l','a'] => Impecable 👌
[1,"gus", True] => Explota todo 💥
```

Al incorporar el concepto de listas nos dimos cuenta que en realidad el tipo de dato String no es mas que una equivalencia a una lista de caracteres `[Char]`. ¿Eso significa que vamos a poder usarlas indistintamente? 🤔 ¡No! Si ya tenemos una abstracción creada de una lista de caracteres, el `String`, vamos a usarla. 😊

```haskell
> "Messi" == ['M', 'e', 's', 's', 'i']
=> True
```

Vimos algunas operaciones simples sobre listas:

```haskell
> length [1,2,3]
=> 3

> head [1,2,3]
=> 1

> take 3 "pdep"
=> "pde"
```

Recordemos que en funcional **no hay efecto** por lo que no estamos modificando la lista sino que creando una nueva.

## Typeclasses

Una typeclass es una nueva forma de agrupar diferentes tipos de datos. ¿En base a qué vamos a agrupar? En base a operaciones básicas, es decir, todos los tipos de datos que formen parte de una typeclass van a tener que sí o sí responder ante ciertas operaciones, definiendo asi un conjunto de elementos que va a comportarse de cierta manera. 😮

Haskell cuenta con muchas typeclasses, pero en particular nos interesan las siguientes:

- `Num`
- `Ord`
- `Eq`
- `Show`

**Num**

Agrupa todos los tipos de dato numéricos, ellos van a soportar opreaciones como la suma y la multiplicacion.

**Ord**

Agrupa tanto a `Num` como a los `String` y `Char` que son ordenables, es decir, tipos de dato que soporten operaciones como `(>) (>=) (<) (<=)`. Los `Bool` también se ven incluídos en este typeclass pero, como dijimos en clase, no estamos de acuerdo ya que no tiene sentido ordenarlos.

**Eq**

Esta typeclass engloba a `Ord` y a los elementos que son equiparables, en otras palabras, agrupa a los tipos de dato que soportan comparaciones por igualdad `(==) o (/=)`.  En esta typeclass es donde nos gustaría que estén los `Bool`.

**Show**

Pertenecen a la typeclass Show aquellos tipos de datos que pueden ser mostrados, soportando asi la opreacion `show`. Entonces en esta familia estamos excluyendo a las funciones, ya que, como vimos o pudiste darte cuenta probando en el compilador, no pueden ser mostradas.

```haskell
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

Estuvimos hablando sobre typeclasses que engloban a otras, lo cual nos trae como consecuencia el siguiente diagrama:

![diagrama de typeclasses](./haskell-type-classes.jpg 'Typeclasses Haskell')
_\* Tener en cuenta que este diagrama no es del todo correcto ni completo, sino que esta simplificado para lo que vamos a ver durante la cursada de pdep_

**Tipando con typeclasses**

Ahora que tenemos el concepto de typeclass vamos a poder restringir aún más el tipo de las funciones.

```haskell
 nombreFuncion :: (Typeclass1 variable de tipo1, Typeclass2 variable de tipo2...) => Variable de tipo1 -> Variable de tipo2...
```

¡¿Cómo?! 😱 Tranqui, acá te mostramos como tipar la funcion `sum`, la cual toma una lista y devuelve la suma de los elementos dentro de la lista:

```haskell
sum :: (Num a) => [a] -> a
```
Lo que tipamos fue que `sum` toma una lista de `a` y devuelve un `a`, peeeero como esa función solo funciona con números, vamos a restringir a la variable de tipo `a` a eso, a que sea númerica. Por eso es que vamos a decirle a `a` que pertenece a la clase de tipo `Num`. 

Otra función de listas muy útil que vimos es `elem`, la cual nos inidca si un elemento pretenence a una lista:

```haskell
elem :: (Eq a) => a -> [a] -> Bool
```
¿Qué pasó ahí? 😯 Como tenemos que comparar por igual al elemento que recibimos por parámetro con los elementos de la lista, ambos tienen que ser del mismo tipo: `a`. Y además, restringirlo a la clase de los tipos equiparables `Eq`.


Otro tipado interesante es el de la funcion `max`:

```haskell
max :: (Ord a) => a -> a -> a
```

Esta función nos indica cual de los dos elementos ingresados es mayor, pero tiene una restricción, ambos elementos tienen que ser ordenables, es decir tienen que pertencer a la typeclass `Ord` ya que la operacion `(>)` va a tener que aceptar a ambos elementos.

¿Solamente podemos restringir con un solo tipo de clase por firma? 😕 Nop, mirá este ejemplo:

```haskel
foo :: (Num a, Eq b) => a -> b -> Bool
```

Acá vemos que podemos hacer diferentes restricciones de typeclass: `a` es `Num` mientras que `b` es un `Eq`.

## Aplicación Parcial

Recordemos que teníamos las siguientes `notasDeGus = [4,4,4,6,8]`. Queremos hacer una función que nos retorne la primera nota multiplicada por dos. Una de las soluciones propuestas fue la siguiente:

```haskell
 alterarNota notas = head notas * 2
```

Pero luego introdujimos el concepto de _aplicacion parcial_:

```haskell
 alterarNota notas = ((*2).head) notas
```

Decimos que una función está parcialmente aplicada cuando le pasamos menos parámetros que los que esta requiere.

En este caso la función `(\*)` esta siendo parcialmente aplicada ya que le estamos pasando solo el 2 mientras sigue esperando el otro parámetro. El faltante será el resultado de aplicar la función `head` a `notas`, es decir, otro número.

Entonces, decimos que el resultado de aplicar parcialmente una función es _otra función_ que espera menos parámetros que la original.

Otro ejemplo que vimos en clase fue con la función `promedioDeGus`, en donde aplicamos parcialmente a la división:

```haskell
promedioDeGus notas = ((/(length notas)).sum) notas
```

**Currificación**

Cuando hablamos de currificación nos referimos a que todas las funciones reciben un único parámetro como máximo. El hecho de que sea posible definir funciones de más de un parámetro se debe a que son funciones currificadas. Cuando evaluamos por ejemplo, max 4 5, lo que sucede es que se le aplica el número 5 a la función resultante de aplicarle el 4 a max, o sea que se transforma en (max 4) 5. Veámoslo:

```haskell
max :: (Ord a) => a -> a -> a <— Forma tradicional

max :: (Ord a) => a -> (a -> a) <— Forma currificada
```

_\* El hecho de que exista la forma currificada no implica que sea lo que vamos a querer escribir siempre... La mayoría de las veces tipamos las funciones de forma tradicional, y así tienen que estar en los parciales/tps/ejercicios._

## Links Útiles

- [Listas](http://aprendehaskell.es/content/Empezando.html#una-introduccion-a-las-listas)
- [Typeclasses](http://wiki.uqbar.org/wiki/articles/typeclasses.html)
- [Typeclasses extendido](http://aprendehaskell.es/content/Tipos.html#clases-de-tipos-paso-a-paso-1a-parte)
- [Aplicacion Parcial](http://wiki.uqbar.org/wiki/articles/aplicacion-parcial.html)
- [Currificacion](http://wiki.uqbar.org/wiki/articles/currificacion.html)

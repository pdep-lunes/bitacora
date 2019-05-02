---
title: Séptima clase
date: '2019-04-29'
description: ‘Recursividad, Fold'
tags: [funcional, recursividad, fold]
---

## Tarea para la clase que viene:

Terminar todas las lecciones de [Mumuki](https://mumuki.io/pdep-utn/chapters/315-programacion-funcional)

## ¿Qué vimos hoy?

- Recursividad
- Fold
- Simulacro de parcial

## Recursividad

¿Qué es la recursividad? La recursividad es como la recursividad. Claro, pero… ¿Qué es la recursividad? La recursividad es como la recursividad. Claro, pero… ¿Qué es la recursividad? 😝

La **recursividad** es cuando a una función la definimos en términos de sí misma 🔄. En otras palabras, cuando se invoca a la función dentro de sí misma.

¿Te acordás alguna función recursiva? Si rebobinás ⏪ hasta AM1 seguro te acuerdes de:

Factorial ❗
Fibonacci 🐌

¿Y cómo las codificamos en Haskell?

```haskell{2}
factorial 0 = 1
factorial n = n * factorial (n - 1)
```

```haskell{3}
fibonacci 0 = 1
fibonacci 1 = 1
fibonacci n = fibonacci (n-1) + fibonacci (n-2)
```

En las dos soluciones podemos observar que hay **como mínimo**: 👀
Un **caso recursivo**, en el cual la función se llama a sí misma.
Un **caso base**, el cual permite cortar la recursividad.

Ahora que sabemos recursividad veamos cómo podemos definir algunas funciones que ya conocemos de listas:

| Forma infija                          | Forma prefija                             |
| ------------------------------------- | ----------------------------------------- |
| `sum [] = 0`                          | `sum [] = 0`                              |
| `sum (x:xs) = x + sum xs`             | `sum (x:xs) = (+) x (sum xs)`             |
| `product [] = 1`                      | `product [] = 1`                          |
| `product (x:xs) = x * product xs`     | `product (x:xs) = (*) x (product xs)`     |
| `and [] = True`                       | `and [] = True`                           |
| `and (x:xs) = x && and xs`            | `and (x:xs) = (&&) x (and xs)`            |
| `or [] = False`                       | `or [] = False`                           |
| `or (x:xs) = x || or xs`              | `or (x:xs) = (||) x (or xs)`              |
| `concat [] = []`                      | `concat [] = []`                          |
| `concat (x:xs) = x ++ concat xs`      | `concat (x:xs) = (++) x (concat xs)`      |
| `aplicar v [] = v`                    | `aplicar v [] = v`                        |
| `aplicar v (x:xs) = x $ aplicar v xs` | `aplicar v (x:xs) = ($) x (aplicar v xs)` |

Como podrás ver estamos repitiendo lógica y, [¿qué pasa cuando repetimos lógica?](https://www.youtube.com/watch?v=8ktYyme_sUw)

En todas estas funciones:
En el caso base nuestra función recibe la lista vacía (`[ ]`) y devuelve un _valor inicial_.
En el caso recursivo siempre tenemos a una operación que recibe:
La cabeza de la lista.
La llamada recursiva de la función que estamos definiendo con la cola como parámetro.

¿Y cómo quitamos toda esta lógica repetida? 😱 ¡Parametrizando!

## Fold

Para salvarnos de la repetición de lógica tenemos a nuestro gran amigo el [fold](https://docs.google.com/document/d/1jSrU7lVMan4nbHBETGqvO5VpqJI0KXVWtH7fqnVASPU/edit). Ahora a nuestro _valor inicial_ que se re repetía en todas nuestras funciones lo llamaremos `semilla`y al operador del caso recursivo lo llamaremos, simplemente, `funcion` . 😜

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr _ semilla [] = semilla
foldr funcion semilla (x:xs) =  funcion x (foldr funcion semilla xs)
```

```haskell
foldl :: (b -> a -> b) -> b -> [a] -> b
foldl _ semilla []     =  semilla
foldl funcion semilla (x:xs) =  foldl funcion (funcion semilla x) xs
```

Peeeero, ¿qué pasa si queremos averiguar el máximo (o mínimo) valor dentro de una lista? ¿Qué puedo usar como semilla? 🌰

Para los casos en los cuales no sabemos qué semilla utilizar, tenemos a `foldl1` que usa el primer elemento de las lista como semilla:

```haskell
foldl1 :: (a ->a-> a) -> [a] -> a
foldl1 _ [x] = x
foldl1 funcion (x:xs) =  funcion x (foldl1 funcion xs)
```

Como verás `foldl1`, a diferencia de `foldl` y `foldr`, no funciona con listas vacías.

Te invitamos a que pruebes en tu consola cómo funciona la familia foldl. 😄

## Simulacro de parcial

En lo que quedo de la clase estuvimos haciendo este [parcial](./parcial-funcional-tierra-de-barbaros.pdf) y como no llegamos a hacer una puesta en común les dejamos [esta posible solución](./solucionParcialBarbaros.hs)

## Links útiles:

[Recursividad](http://wiki.uqbar.org/wiki/articles/recursividad-en-haskell.html)
[Foldl](http://wiki.uqbar.org/wiki/articles/fold.html)
[Video de foldl del gran profesor Alf](https://www.youtube.com/watch?v=veiQkxz59NE)

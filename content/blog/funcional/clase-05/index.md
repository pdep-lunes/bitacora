---
date: '2020-05-04'
description: ‘Quinta clase de PdeP'
tags:
  [
    funcional,
    data,
    expresiones-lambda
  ]
---

## ¿Qué vimos hoy?

Volvemos a ver el tp de la clase pasada [TP "Hora de lectura"](https://docs.google.com/document/d/11uYGXvG-TnNhveawDjKD1iSWKW9Qy8PVqlvtHhV58F8/edit) . Vamos a hacer algunos ejercicios nuevos dentro del mismo dominio.

Arrancamos con guardas. Habíamos mostrado cuando NO queríamos usar guardardas y ahora vamos a ver cuando si.

Vamos a modelar el género de un libro:

- Si tiene menos de 50 páginas, es un cómic
- Si el autor es Stephen King, es de terror
- Si el autor es japonés, es un manga
- En cualquier otro caso, no sabemos el género

Deberíamos agregar la nacionalidad al conjunto de autores? Lo único que necesitamos para este caso es saber si es japones. 

Cómo modelamos la función genero? Arranquemos con el tipo: 

```haskell
genero :: Libro -> String
```

¿Por qué no se puede resolver por pattern matching? 
Se pregunta si Pattern matching solo se usa para booleanos, y se muestra por ejemplo en los accessors que no. Con pattern matching podemos devolver cualquier tipo de dato!

Usamos pattern matching cuando tenemos algo que encaja con un patrón, por ejemplo una tupla de 3 elementos, una lista vacía, etc.
Usamos guardas cuando queremos evaluar conjuntos de dominios (en matemática, esto es muy similar a las funciones partidas).

Volvamos al ejercicio:

```haskell
genero unLibro 
  | ((>50).cantidadDePaginas) unLibro = “Comic”
  | esDe “Stephen King” unLibro = “Terror”
  | (esJapones.autor) unLibro = “Manga”
  | otherwise = “No clasificado”
```

Construimos la función auxiliar `esJapones`:

```haskell
esJapones :: Libro -> Bool
esJapones “Hajime Isayama” = True
esJapones _ = False
```

Por qué en el conjunto `otherwise` entra todo el resto del dominio abarcado? Resulta que `otherwise` es nada más que un sinónimo de `True`! Utilizamos `otherwise` para ser más expresivos. 

Ahora volvamos a los tipos de datos. ¿Qué pasa si uso género y le paso otra tupla? Vamos a probar con una tupla Persona, por ejemplo (“Gustavo”, “Trucco”, 28):

```haskell
genero (“Gustavo”, “Trucco”, 28)
> “Comic”
```

Al usar una tupla del tipo `(String, String, Int)`, si bien no es un libro, podemos utilizar la función `género` ya que este tipo coincide con el tipo de libro. Recordemos que al usar `type alias` estamos siendo más expresivos pero no estamos haciendo una validación para ese tipo de dato. Para resolver este problema, introducimos el concepto de `data`.

```haskell
data Libro = UnLibro String Autor Int
```
`UnLibro` es una función que llamamos `constructor`. ¿Cuál es el tipo de `UnLibro`?

```haskell
UnLibro :: String -> Autor -> Int -> Libro
```

Podemos ver que la función recibe los parámetros que necesitamos para crear al libro. Vamos a modelar “El visitante”:

```haskell
UnLibro “El visitante” “Stephen King” 592
```
Si probamos esto en la consola de Haskell, no vamos a poder ver el libro ya que nuestro data no es mostrable. ¿Qué significa esto? Haskell no sabe cómo mostrar nuestro tipo de dato. Esto lo podemos resolver utilizando `deriving show` al final de la declaración del data:

```haskell
data Libro = UnLibro String Autor Int deriving show
```

Hasta acá, `data` parece ser más complejo que usar tuplas. ¿Qué ventajas nos está dando? Como dijimos antes, con los `type alias` no estábamos creando un tipo de dato. Utilizando `data` podemos validar estrictamente los tipos de las funciones que modelamos. Antes pudimos usar la función `genero` para humanos y no queríamos poder hacer eso. Ahora con `data` podemos hacer que la función `genero` solamente pueda recibir libros.

Además, podemos utilizar `record syntax` con data y tenemos los accessors!

```haskell
data Libro = UnLibro { titulo :: String, autor :: Autor, cantidadDePaginas :: Int } deriving show
```

Acá podemos ver que los accessors son nada más y nada menos que funciones! Miremos por ejemplo el tipo de titulo:

```haskell
titulo :: Libro -> String
```

Ambas sintaxis para definir datas son equivalentes, solo que la record syntax nos regala las funciones para acceder a las propiedades.

Por otro lado, si queremos comparar una instancia de data con otra, tenemos que decirle a haskell que queremos que sean comparables. Cómo hacemos eso? Utilizando `eq`:

```haskell
data Libro = UnLibro { titulo :: String, autor :: Autor, cantidadDePaginas :: Int } deriving (show, eq)
```

Ahora vamos a modelar la función `agregarPaginas`. Esta función va a modificar al libro original? ¡No! Los data, al igual que todo en funcional, siguen siendo inmutables. Por ende, la función nos devolverá una copia del libro con la cantidad de páginas aumentada.

```haskell
agregarPaginas :: Libro -> Int -> Libro
agregarPaginas (UnLibro unTitulo unAutor unaCantidadDePaginas) paginasAAgregar = UnLibro unTitulo unAutor (unaCantidadDePaginas + paginasAAgregar)
```

Podemos hacer lo mismo con la record syntax:

```haskell
agregarPaginas :: Libro -> Int -> Libro
agregarPaginas unLibro paginasAAgregar = unLibro { cantidadDePaginas = cantidadDePaginas unLibro +  paginasAAgregar}
```

Es importante destacar que para devolver la nueva cantidad de paginas debemos sumar la cantidad de paginas original. Para eso, utilizamos el accessor `cantidadDePaginas` y es importante pasarle por parámetro `unLibro` para que pueda darnos el valor. `cantidadDePaginas` sigue siendo una función que necesita su parámetro.

Para que quede aclaro, hagamos otro ejemplo. Modelemos `sacarSecuela`, que agrega un "2" al final del título y cuyas páginas siempre serán 400.

```haskell
sacarSecuela :: Libro -> Libro
sacarSecuela unLibro = { cantidadDePaginas = 400, titulo = ((++ " 2").titulo) unLibro }
```

Ahora, tenemos una repetición de lógica en ambas funciones. En ambas estamos cambiando las páginas de alguna forma. ¿Podemos abstraer esa lógica? Claro que si! Modelemos la función `cambiarCantidadDePaginas`:

```haskell
cambiarCantidadDePaginas :: (Int -> Int) -> Libro -> Libro
cambiarCantidadDePaginas unaFuncion unLibro = unLibro { cantidadDePaginas = unaFuncion (cantidadDePaginas unLibro) }
```

Ahora la cantidad de páginas se cambia según una función recibida por parámetro (concepto de *órden superior*). Pero... en `sacarSecuela` no usabamos una función, asignabamos 400, ¿Cómo hacemos para utilizar la función? Podemos utilizar `const`, la cual recibe dos parámetros y siempre se queda con el primero.

Ya que estamos, podemos abstraer el cambio de título de forma similar al cambio de cantidad de páginas:

```haskell
cambiarTitulo :: (String -> String) -> Libro -> Libro
cambiarTitulo unaFuncion unLibro = unLibro { titulo = unaFuncion (titulo unLibro) }
```

Nuestras funciones quedarían:

```haskell
agregarPaginas' :: Libro -> Int -> Libro
agregarPaginas' algunLibro paginasAAgregar = cambiarCantidadDePaginas (+ paginasAAgregar) algunLibro

sacarSecuela :: Libro -> Libro
sacarSecuela unLibro = (cambiarCantidadDePaginas (const 400) . cambiarTitulo (++ " 2")) unLibro
```

Pasemos ahora a modelar a las personas. Las personas tienen un nombre y un conjunto de libros que le gustan:

```haskell
type Persona = (String, [Libro])

gustos :: Persona -> [Libro]
gustos unaPersona = snd unaPersona
```

Ahora queremos saber si a una persona le gusta un libro. Definimos la función `leGusta`.

```haskell
leGusta :: Libro -> Persona -> Bool
leGusta unLibro unaPersona = any (== unLibro) (gustos unaPersona)
```

De esta forma asumimos que a una persona siempre le gustan algunos libros. Ahora hagamos un cambio al modelado. En vez de tener los libros que le gustan a la persona, definamos un criterio por el cual a una persona le gusta un libro:

```haskell
type Persona = (String, [Libro -> Bool])

julian :: Persona
julian = ("Julian", [esLibroLigero, esLibroFantasioso, esDe "Stephen King"])
```

Y ahora nuestra función leGusta quedaría:

```haskell
leGusta :: Libro -> Persona -> Bool
leGusta unLibro unaPersona = any (leGustaSegun unLibro) (gustos unaPersona)

leGustaSegun ::  Libro -> (Libro -> Bool) ->         Bool
leGustaSegun    unLibro       unGusto     =     unGusto unLibro
```

Que nos pasa con la función `leGustaSegún`? No tiene demasiada lógica, y además es dificil encontrar un nombre expresivo para esta función auxiliar. Para eso, dentro de haskell contamos con las expresiones Lambda: funciones que no necesitamos nombrar y que usamos para este tipo de casos particulares. Reescribamos la función `leGusta` utilizando lambda: 


```haskell
leGusta :: Libro -> Persona -> Bool
leGusta unLibro unaPersona = any (\unGusto -> unGusto unLibro) (gustos unaPersona)
```

La lambda está definida entre paréntesis. En este caso recibe un solo parámetro, pero podría recibir varios. La `->` indica dónde terminan los parámetros y empieza la función. Las expresiones lambda o funciones anónimas nos sirven para este tipo de casos específicos.


## Links Útiles

- [Solución del ejercicio de hoy](https://gist.github.com/julian-berbel/902aa2942c210c2dbeef3adcf9ec147b)
- [Video de la clase](completar)
 
## Tarea para la clase que viene:

- Leer apunto de [git](completar)
- Realizar el [TP](https://docs.google.com/document/d/1EAN_RC2zngF1jiy4MGCuLvYQvr1euHj1Xx4ORiDh-nE/) y entregarlo por github
- (Opcional) Hacer las guías de Mumuki de [Lambda](https://mumuki.io/pdep-utn/lessons/743-programacion-funcional-expresiones-lambda), [Data](https://mumuki.io/pdep-utn/lessons/745-programacion-funcional-modelado) y [uso de consola y git](https://mumuki.io/pdep-utn/chapters/438-control-de-versiones).

---
title: Quinta clase
date: '2019-04-15'
description: 'Pattern Matching, Tuplas y Git'
tags: [funcional, pattern-matching, tuplas, git]
---

## Tarea para la clase que viene

- Primer entrega del TP.
- Hacer lecciones 7, 8 y 9 de [Mumuki](https://mumuki.io/pdep-utn).

## ¿Qué vimos hoy?

1. Pattern Matching
2. Tuplas
3. Data
4. Git

## Pattern Matching

Quisimos hacer una función que nos diga el gusto de helado 🍦 de cada persona. Con lo que sabíamos planteamos esta solución:

```haskell
gustoDeHelado :: String -> String

gustoDeHelado nombre
  | nombre == "Gastón" = "Crema americana"
  | nombre == "Marcelo" = "Menta granizada"
  | nombre == "Rocio" = "Chocolate blanco"
  | otherwise = "Kinotos al whiskey"
```

Ufff todo eso y solo fueron 3 nombres 😓 ¿¡Qué pasaría si fueran más!? Tendríamos que seguir comparando por igual al parámetro con los nombres que vayamos agregando por cada guarda 😱. ¿No habrá otra solución donde no repitamos tanto lo que hacemos? La respuesta es sí y se llama **pattern matching** 😎. No Peter Machine. 😝
Veamos como codeamos esa solución: 👀

```haskell
gustoDeHelado :: String -> String

gustoDeHelado "Gastón" = "Crema americana"
gustoDeHelado "Marcelo" = "Menta granizada"
gustoDeHelado "Rocio" = "Chocolate blanco"
```

¿Con eso nos alcanzaba? ¿Qué pasaba si preguntábamos por un nombre que no aparece en lo que definimos? 🤔 Veamos:

```haskell
> gustoDeHelado "Gus"
💥
```

Para eso es que tenemos que definir nuestro _otherwise_ pero del pattern matching y eso lo hacemos así:

```haskell
gustoDeHelado :: String -> String

gustoDeHelado "Gastón" = "Crema americana"
gustoDeHelado "Marcelo" = "Menta granizada"
gustoDeHelado "Rocio" = "Chocolate blanco"
gustoDeHelado otroNombre = "Kinotos al whiskey"
```

¡Ahora sí! ¿Pero estamos usando el parámetro `otroNombre` del otro lado del `=`? Nop 😅. Para eso es que recurrimos a la **variable anónima**: `_`.

```haskell
gustoDeHelado :: String -> String

gustoDeHelado "Gastón" = "Crema americana"
gustoDeHelado "Marcelo" = "Menta granizada"
gustoDeHelado "Rocio" = "Chocolate blanco"
gustoDeHelado _ = "Kinotos al whiskey"
```

¿Podríamos usar la variable anónima del lado derecho del igual? **No**. La variable anónima es un _patrón_, no es un valor. Por eso es que pertenece al lado izquierdo del igual, no la saquemos de su hábitat natural 😌. _¿Pero qué pasa si no me importa nada y lo uso del lado derecho?_ La respuesta es: 🦆 en el parcial.

Algo muy importante que no hay que olvidar es que Haskell va a leer de arriba a abajo todos los casos de _matcheo_, así que si repetimos un nombre no solo nos va a decir que hay un caso que se repite (con las guardas no pasaba), sino que también nos va a devolver lo que diga el primero de ambos:

```haskell
gustoDeHelado :: String -> String

gustoDeHelado "Gastón" = "Crema americana"
gustoDeHelado "Gastón" = "Sambayón"
gustoDeHelado "Marcelo" = "Menta granizada"
gustoDeHelado "Gastón" = "Frambuesa"
gustoDeHelado "Rocio" = "Chocolate blanco"
gustoDeHelado _ = "Kinotos al whiskey"

> gustoDeHelado "Gastón"
"Crema americana"
```

Tampoco deberíamos agregar casos después del de la variable anónima porque nunca podremos llegar a ellos ya que recordemos que representa a _lo demás que no apareció antes_. Así que como en las guardas, el **orden importa**. 😉 ¡Y también todos los casos deben devolver algo del mismo tipo de dato!

Volvamos al tema de los patrones y valores:

Existen 3 mundos de haskell: los _valores_, los _tipos_ y los _patrones_. Y no se mezclan entre sí. 
Entonces, "mochila", ¿qué es? Claramente no es un tipo 😅 así que es un valor... ¿¡ o un patrón!? 😕
Va a depender qué sea según _donde lo escribamos en el código_.

Acá, que está al lado izquierdo del `=`,  es un patrón:

```haskell
cosasParaLaEscuela "mochila" = True
```

Acá, que está al lado derecho del `=`, es un valor:

```haskell
loMasNecesarioPara "Priscila" = "mochila"
```

###### PatternMatcheando listas

¡Así es! Como vimos también podemos matchear listas. 🎉 Para eso utilizamos los siguientes patrones:
* `[]` para la lista vacía;
* `(cabeza:cola)` para la lista con al menos un elemento;
* `(x:y:xs)` para una lista como al menos dos elementos.

Con todo lo que sabemos ahora pudimos definir funciones que ya conocíamos de listas:

```haskell
null :: [a] -> Bool
null [] = True
null _ = False

head :: [a] -> a
head (x:xs) = x

tail :: [a] -> [a]
tail (x:xs) = xs
```

## Tuplas

Hasta ahora veníamos trabajando con tipos de datos "sueltos". La única forma que conocíamos de "agrupar" valores eran las listas, pero las mismas tienen una restricción bastante fuerte: todos los elementos tienen que ser del mismo tipo. 😔 
Entonces, ¿cómo hacemos si queremos modelar a una persona con su nombre (un `String`) y una edad (un `Int`)? Usamos las **tuplas**. 😎 Pero ojo 👀 que su cantidad de elementos no puede variar como en las listas. Si decidimos que sólo va a contener, por ejemplo, dos elementos, no se van a poder agregar más en el futuro.

Algunas funciones que podemos usar con _duplas_ (tuplas de dos elementos) son:

```haskell
fst :: (a, b) -> a

> fst (1, "Hola")
1
```

```haskell
snd :: (a, b) -> b

> snd (1, "Hola")
"Hola"
```

Antes de seguir con las tuplas, veamos algo para hacer nuestro código más expresivo: **type alias** o **alias de tipo**. ¿Para qué sirven? Para definir nuestros propios nombres de tipo que sean sinónimo de otro tipo. Por ejemplo, `String` es un alias de `[Char]`.

¡Genial! Tenemos todo lo necesario para poder modelar a una persona. 🙆‍♀️

```haskell
type Nombre = String
type Edad = Int
-- para lograr más expresividad creamos los alias `Nombre`y `Edad` que serán un `String` y un `Int` respectivamente.
type Persona = (Nombre, Edad)
-- creamos un alias para poder representar a la persona como una tupla
```

¡Festejemos un cumpleaños! 🎂 Hagamos la función `cumplirAños`:

```haskell
type Nombre = String
type Edad = Int
type Persona = (Nombre, Edad)
cumplirAños :: Persona -> Persona
cumplirAños (nombre, edad) = (nombre, edad + 1)
```

Usando pattern matching pudimos definir la función. Y vemos que el nombre no se usa así que podemos sacarlo para poner la variable anónima, ¿no? 😄 Noooo. ¿Qué pasa si hacemos eso? Estaríamos "perdiendo" el nombre cuando recibimos la tupla y no podríamos ubicarlo en la nueva tupla que devolvemos.

Otra forma de definir la función, sin pattern matching es.

```haskell
type Nombre = String
type Edad = Int
type Persona = (Nombre, Edad)
cumplirAños :: Persona -> Persona
cumplirAños unaPersona = (fst unaPersona, snd unaPersona + 1)
```

¿Y si ahora queremos representar a una persona con nombre, edad, peso y altura? Vamos a tener esta tupla:

```haskell
type Persona = (String, Int, Float, Float)
```

¿Y solo queremos saber el nombre de la persona? ¿O la edad? ¿O el peso? ¿O la altura? 🤔 Para eso podemos usar pattern matching para devolver solo lo que necesitamos. A este tipo de funciones las llamamos _accessors_. 😎

```haskell
nombre :: Persona -> String
nombre (unNombre, _, _, _) = unNombre

edad :: Persona -> Int
edad (_, edad, _, _) = edad

peso :: Persona -> Float
peso (_, _, peso, _) = peso

altura :: Persona -> Float
altura (_, _, _, altura) = altura
```

En este caso pudimos usar a la variable anónima porque ignoramos datos que no necesitamos ya que no vamos a devolver una tupla con todos los elementos, sino solo el que nos interesa.

Ahora que estamos cancheras y cancheros, modelemos un auto con su modelo y kilómetros. 🚗

```haskell
type Auto = (String, Int)
```

Mmmmm, ¿lo podremos hacer cumplir años? O sea, no debería poder porque es un auto y `cumplirAños` recibe personas... Veamos qué pasa:

```haskell
type Auto = (String, Int)
type Persona = (String, Int)

cumplirAños :: Persona -> Persona
cumplirAños unaPersona = (fst unaPersona, snd unaPersona + 1)

> cumplirAños ("Toyota Corolla", 10000)
("Toyota Corolla", 10001)
```

¡Noooo! ¿¡Cómo es posible!? 😩

Lo que pasa es que tanto `Auto` como `Persona` no son tipos de datos, sino que son sinónimos de `(String, Int)`. Así que `cumplirAños` va a funcionar con cualquier tupla que tenga ese tipo.

¿¡Y cómo lo solucionamos!? 😱 ¡Sigamos!

## Data

Lo que necesitamos para solucionar el problema anterior es poder restringir a `cumplirAños` para que funcione solo con personas. Para eso es que vamos a _crear nuestro propio tipo de dato_ con **Data**.
Su sintaxis es: `TipoACrear = Constructor Tipo1 Tipo2`

```haskell
data Persona = Persona String Int 

> Pesona "Gonza" 22
```

Y para tener más expresividad podemos combinar data con type alias:

```haskell
type Nombre = String
type Edad = Int
data Persona = Persona Nombre Edad
```

¿Cuál es la diferencia con lo que hacíamos? Antes teníamos una tupla que contenía un `String` que representaba al nombre de la persona y un `Int` que representaba la edad de la persona. A esa tupla le pusimos como alias `Persona` pero nunca, nunca, creamos un tipo de dato. Ahora con data sí lo estamos haciendo.

Otra forma de crear un data es así:

```haskell
data Persona = Persona {nombre :: String, edad :: Int} deriving Show
```

¡Y así obtenemos accessors gratis! 😜 Porque tanto `nombre` como `edad` son funciones que nos van a permitir acceder a esos campos del data.

¿Por qué agregamos el `deriving Show`? 💭 Porque esa es la forma que tenemos para decirle a Haskell que `Persona` va a pertenecer a la clase de tipo `Show` y va a poder mostrarse.

Entonces, así como creamos el tipo de dato `Persona`, creemos el tipo de dato `Auto`:

```haskell
data Auto = Persona {modelo :: String, kilometros :: Int} deriving Show
```

Teniendo los dos tipos de dato creados, probemos la función `cumplirAños` que ahora no recibe una persona representada como una tupla sino el _tipo de dato_ `Persona`.

```haskell
data Persona = Persona {nombre :: String, edad :: Int} deriving Show

data Auto = Persona {modelo :: String, kilometros :: Int} deriving Show

cumplirAños :: Persona -> Persona
cumplirAños unaPersona = unaPersona {edad = ((+1).edad) unaPersona}
-- estoy modificando el campo edad. Para eso necesito la edad de la persona (que la obtengo usando el accessor (una función) `edad`) y la compongo con `(+1)` para aplicárselo a `unaPersona`.

> cumplirAños (Auto "Toyota Corolla" 10000)
💥
-- porque ahora cumplirAños recibe al tipo Persona y le pasamos algo del tipo Auto.
```

## Git

Todo lo que necesitás saber está [acá](https://docs.google.com/document/d/147cqUY86wWVoJ86Ce0NoX1R78CwoCOGZtF7RugUvzFg/edit#heading=h.pfzudah6sze2) y en el [capítulo 4 de Mumuki](https://mumuki.io/pdep-utn/chapters/309-control-de-versiones). 🎉
Y obvio que si te quedan dudas podés consultarlas con tu tutora o tutor. 🌈

## Links Útiles

- [Pattern Matching](http://wiki.uqbar.org/wiki/articles/pattern-matching-en-haskell.html)
- [Tuplas, Typeclasses y Data](http://wiki.uqbar.org/wiki/articles/data--definiendo-nuestros-tipos-en-haskell.html)

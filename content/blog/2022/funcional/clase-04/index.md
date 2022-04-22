---
title: Cuarta clase
date: "2022-04-18"
description: "Cuarta clase de PdeP"
tags: [funcional, guardas, práctica]
---

Resolvimos el ejercicio [Hora de lectura](https://docs.google.com/document/d/1YBTaPNfEd4s82UxmsRjYRZXCCA8-lQgFaLOEVbr0fGw/edit). Pero… ¿Por dónde empezamos? 😅 Si vamos a trabajar con libros, empecemos por ahí. ¡A modelarlos! 🎨

⚠️ Disclaimer: Es muy importante leer todo el enunciado antes de ponerse a codear. En este caso, vamos a ir a nuestro ritmo sólo por fines pedagógicos. ⚠️

Tenemos que crear cada libro, para eso, vamos a crear… ¿variables? ¡No! 😠 En funcional **no existen las variables** porque las cosas no varían. Recordá: **en Haskell no hay estado**. Es por eso que vamos a crear **etiquetas** 🏷️ representando a cada libro. ¿Y cómo los vamos a representar? 💭 Bueno, sabemos que cada libro tiene un título, un autor y una cantidad de páginas, entonces podríamos crear a *"El visitante"* y a *"Shingeki no Kyojin capítulo 1"* de esta forma:

```haskell
elVisitante :: (String, String, Int)
elVisitante = ("el visitante", "Stephen King", 592)

shingekiNoKyojin1 = (String, String, Int)
shingekiNoKyojin1 = ("shingeki no kyojin 1 ", "Hajime Isayama", 40)
```

Y así seguimos con los demás títulos. Peeeero, antes de avanzar, ¿no hay algo que te llame la atención? 🤔 Pongámonos a filosofar: ¿qué es `elVisitante `? ¿qué es `shingekiNoKyojin1`? ¡Son libros 📚! Entonces, ¿no estaría bueno poder llamarlos como corresponde?

```haskell
elVisitante :: Libro
elVisitante = ("el visitante", "Stephen King", 592)

shingekiNoKyojin1 = Libro
shingekiNoKyojin1 = ("shingeki no kyojin 1 ", "Hajime Isayama", 40)
```

Por suerte, esto no va a quedar en un deseo. Lo vamos a poder hacer realidad con el **type alias** (en criollo: un apodo o un alias). Gracias a esta herramienta vamos a lograr que nuestro código sea más expresivo 😌. Entonces, para hacer esto posible deberemos agregar a nuestra solución un type alias:

```haskell
type Libro = (String, String, Int)

elVisitante :: Libro
elVisitante = ("el visitante", "Stephen King", 592)

shingekiNoKyojin1 = Libro
shingekiNoKyojin1 = ("shingeki no kyojin 1 ", "Hajime Isayama", 40)
```

¡Y podemos seguir mejorando la expresividad de nuestro código! Si sabemos que nuestro libro es una terna compuesta por el título, autor y la cantidad de páginas… Mirá 👀:

```haskell
type Titulo = String
type Autor = String
type CantidadDePaginas = Int
type Libro = (Titulo, Autor, CantidadDePaginas)

elVisitante :: Libro
elVisitante = ("el visitante", "Stephen King", 592)

shingekiNoKyojin1 = Libro
shingekiNoKyojin1 = ("shingeki no kyojin 1 ", "Hajime Isayama", 40)
```

Y una vez que hayamos modelado todos los libros, ¡es hora de armar la biblioteca! Para eso vamos a usar vari... ¡Noooo! 😡 Crearemos una etiqueta. ¿Y cómo va a ser la biblioteca? Bueno, una lista con los libros que modelamos. ¿Y su tipo? ¿Una lista de `(String, String, Int)`? ¿O una lista de `Libro`s? 💭 Si bien dijimos que `(String, String, Int)` y `Libro` eran lo mismo, para darle un sentido semántico a nuestra solución, vamos a elegir como tipo de la biblioteca a lista de `Libro`s:

```haskell
biblioteca :: [Libro]
biblioteca = [elVisitante, shingekiNoKyojin1, shingekiNoKyojin3, shingekiNoKyojin27, fundacion, sandman5, sandman10, sandman12, eragon, eldest, brisignr, legado]
```

Sabemos lo que estás pensando… también nos gustaría tomar un helado 🍦. ¿Eh? ¿Eso no era lo que pensabas? 😳 No bueno, sí, también creemos que sería una buena idea crear un type alias para la biblioteca 😅:   

```haskell
type Biblioteca = [Libro]

biblioteca :: Biblioteca
biblioteca = [elVisitante, shingekiNoKyojin1, shingekiNoKyojin3, shingekiNoKyojin27, fundacion, sandman5, sandman10, sandman12, eragon, eldest, brisignr, legado]
```

Hagamos un recreíto de tanto código 🥴. Te vamos a contar un secreto 🤫: ¿viste el `String`? Bueno, ¡también es un apodo! ¿Te imaginás cuál es su verdadero nombre? 🙈 Es `type String = [Char]`. Así es, un `String` no es nada más ni nada menos que una lista de caracteres, una lista de `Char`. ¿Eso significa que a partir de ahora vamos a llamarle `[Char]`? ¡Nooo! El `String` va a seguir llamándose `String`, por algo alguien decidió crear ese type alias. ¿No nos crees? Mirá este ejemplo:

```haskell
> "¡Hola!" == ['¡', 'H', 'o', 'l', 'a', '!']
True
```

El string `¡Hola!` es lo mismo que la lista de caracteres `['¡', 'H', 'o', 'l', 'a', '!']`. Porque como dijimos, `String` es un type alias de `[Char]`. ¡Sigamos con el TP! 🌈

Ya modelamos los libros y la biblioteca. Es hora de definir las funciones que nos piden 👩‍💻👨‍💻. La primera es `promedioDePaginas`. ¿Por dónde la encaramos 😵? **Nuestro consejo es empezar por el tipo de la función**. De esa forma, vamos a tener en mente qué parámetros toma y qué devuelve para luego definirla. 😊
¿Cuántos parámetros toma `promedioDePaginas`? Uno solo, la biblioteca. Entonces, vamos a empezar poniendo una sola flechita (**recordá que el tipo de una función tiene la misma cantidad de flechitas que de parámetros**):

```haskell
promedioDePaginas :: ...  -> ...   
```

A veces, es muy claro qué devuelve una función, por lo que podemos empezar completando ese espacio del tipo de la misma. En este caso, como vamos a hacer un promedio, vamos a obtener como resultado un número entero:

```haskell
promedioDePaginas :: ...  -> Int
```

¿Y de qué tipo es el parámetro que toma? Dijimos que era una biblioteca y el tipo de la biblioteca es `Biblioteca`:

```haskell
promedioDePaginas :: Biblioteca -> Int
```

¡Wooohooo 🎉! Tenemos el tipo de nuestra función. Ahora, definámosla:

```haskell
promedioDePaginas :: Biblioteca -> Int
promedioDePaginas unaBiblioteca = div (cantidadDePaginasTotales unaBiblioteca) (length unaBiblioteca)

cantidadDePaginasTotales :: Biblioteca -> Int
cantidadDePaginasTotales unaBiblioteca = sum . map cantidadDePaginas $ unaBiblioteca
 
cantidadDePaginas :: Libro -> Int
cantidadDePaginas (_, _, unasPaginas) = unasPaginas
```

Algo muy importante que hicimos en esta solución fue **delegar**. Es decir, dividimos nuestro gran problema en partecitas más pequeñas para poder resolverlo más fácilmente. De esta forma obtenemos un código más **declarativo**. Peeero, tampoco debemos irnos al extremo de sobredelegar: haber creado la función `cantidadDeLibrosDeLaBiblioteca` (que recibe una biblioteca y nos devuelve su longitud) es lo mismo que hacer directamente `length biblioteca`. La razón por la que no está bueno sobredelegar es que no estamos creando funciones que hagan nuevas cosas, sino que sólo estamos renombrando funciones que ya existen y conocemos.

Enfoquémonos en `cantidadDePaginas` 🔍. Es una función que dada una tupla, nos devuelve un elemento en específico de la misma. Esto es lo que llamamos un **accessor**. 
En este caso, ya que teníamos una terna, tuvimos que hacer nuestra propia definición del accessor. Para las duplas ya tenemos definidas `fst` y `snd` que devuelven el primer y el segundo elemento, respectivamente, de una tupla de dos elementos.

El uso del accessor es posible gracias a **pattern matching**, que es el concepto asociado al chequeo estructural de un dato respecto de una estructura esperada. Gracias a esto podemos tener un código más declarativo y simple. Sin embargo, su desventaja es que depende de los cambios de estructuras. Imaginémonos que nosotros agregamos un cuarto elemento a la tupla que representa al Libro. Esto haría que no fuera posible utilizar nuestro accessor inicial, ya que estructuralmente la tupla cambió.  

Ahora toca el turno de definir `esLecturaObligatoria`. De vuelta vamos a descomponerla en funciones para que sea más fácil construirla. 💡 Un consejo que solemos dar es definir la función de tal forma que cuando la leamos, quede igual que el enunciado. Y la única forma de hacer esto posible es delegando:

```haskell
type Saga = [Libro]

sagaDeEragon :: Saga
sagaDeEragon = [eragon, eldest, brisignr, legado]

autor :: Libro -> Autor
autor (_, unAutor, _) = unAutor

esLecturaObligatoria :: Libro -> Bool
esLecturaObligatoria unLibro = esDeStephenKing unLibro || perteneceASagaEragon unLibro || esFundacion unLibro

esDeStephenKing :: Autor -> Libro -> Bool
esDeStephenKing unAutor unLibro = ((== "Stephen King") . autor) unLibro

perteneceASagaEragon :: Libro -> Bool
perteneceASagaEragon unLibro = elem unLibro sagaDeEragon

esFundacion :: Libro -> Bool
esFundacion unLibro = unLibro == fundacion
```

Fijate que la función `esLecturaObligatoria` quedó igual que el enunciado; el mismo dice: *”Es una lectura obligatoria cuando es de Stephen King o de la saga de Eragon o es el ejemplar de Fundación de 230 páginas de Isaac Asimov”*. A esto nos referimos con delegar y que se pueda leer como una oración del TP. 😁

Hagamos una observación 🔍: cuando creamos la `sagaDeEragon`, le pusimos como tipo `Saga`, donde saga es `[Libro]`. ¡Lo mismo que la biblioteca! ¿Y por qué no reutilizamos el tipo `Biblioteca` si también es `[Libro]` 🤨? Porque si bien *sintácticamente* son lo mismo, *semánticamente* no lo son. Es decir, si bien las dos son del tipo `[Libro]`, una biblioteca no es lo mismo que una saga (y si no nos crees, buscalas en el diccionario 😜). Haciendo esta diferencia ganamos expresividad.

Veamos otra versión de `esLecturaObligatoria` con **pattern matching** (y nuestra versión preferida porque usa una herramienta del paradigma funcional y además, es más declarativa): 

```haskell
esLecturaObligatoria' :: Libro -> Bool
esLecturaObligatoria' (_, "Stephen King", _) = True
esLecturaObligatoria' (_, "Isaac Asimov", 230) = True
esLecturaObligatoria' unLibro = perteneceASagaEragon unLibro
esLecturaObligatoria' _ = False
```

⚠️ Hay que tener mucho cuidado con el orden cuando utilizamos pattern matching. Los casos deben ir de lo más particular a lo más general. ⚠️
En este caso `(_, "Stephen King", _)` y `(_, "Isaac Asimov", 230)` matchean con duplas que tengan ese formato, mientras que `unLibro` matchea con cualquier tupla (por eso va después) y por último va la variable anónima (`_`) que matchea con cualquier cosa. Así vamos de los casos más específicos a los generales.


Y así como tenemos una solución preferida, tenemos una que no nos gusta para nada 🤬:

```haskell
esLecturaObligatoria :: Libro -> Bool 
esLecturaObligatoria unLibro
            | unLibro == eragon = True
            | unLibro == eldest = True
            | unLibro == brisignr = True
            | unLibro == legado = True
            | autor unLibro == "Stephen King" = True
            | unLibro == fundacion = True
	|otherwise = False
```

Usar **guardas** de esta forma es un 2 (2️⃣) automático en el parcial, un desaprobado. Es un **mal uso de booleanos** y una **muy muy mala práctica** de programación. Dicho esto, quien avisa no traiciona… 👀

¡Sigamos! Es el turno de `esFantasiosa`. Comencemos con su tipo, así que como recibe un parámetro, ponemos una flechita:

```haskell
esFantasiosa :: ... -> ...
```

Sabemos que devuelve un booleano, por lo tanto:

```haskell
esFantasiosa :: ... -> Bool
```

Y sabemos que toma una biblioteca:

```haskell
esFantasiosa :: Biblioteca -> Bool
```

Tadáaa 🎉, tenemos el tipo de nuestra función. Ahora definámosla:

```haskell
esFantasiosa :: Biblioteca -> Bool
esFantasiosa unaBiblioteca = any esLibroFantasioso unaBiblioteca

esLibroFantasioso :: Libro -> Bool
esLibroFantasioso unLibro = esDeChristopherPaolini unLibro || esDeNeilGaiman unLibro

esDeChristopherPaolini :: Autor -> Libro -> Bool
esDeChristopherPaolini unAutor unLibro = ((== "Christopher Paolini") . autor) unLibro

esDeNeilGaiman :: Autor -> Libro -> Bool
esDeNeilGaiman unAutor unLibro = ((== "Neil Gaiman") . autor) unLibro
```

Mmmm, un momento ✋. Algo está oliendo mal 🤢… ¡a repetición de lógica! 🤮 Mirá estas tres funciones:


```haskell
esDeStephenKing :: Autor -> Libro -> Bool
esDeStephenKing unAutor unLibro = ((== "Stephen King") . autor) unLibro

esDeChristopherPaolini :: Autor -> Libro -> Bool
esDeChristopherPaolini unAutor unLibro = ((== "Christopher Paolini") . autor) unLibro

esDeNeilGaiman :: Autor -> Libro -> Bool
esDeNeilGaiman unAutor unLibro = ((== "Neil Gaiman") . autor) unLibro
```

Son prácticamente iguales 😱. En todas se **repite la lógica** de obtener el autor de un libro para fijarnos si es un autor en especial 😵. Para solucionar esto, vamos a crear una función que tenga sólo la lógica repetida, parametrizando lo único que cambia (que en este caso son los nombres de los autores):

```haskell
esDe :: Autor -> Libro -> Bool
esDe unAutor unLibro = ((== unAutor) . autor) unLibro
```

Nuestra solución ahora quedaría así:

```haskell
esFantasiosa :: Biblioteca -> Bool
esFantasiosa unaBiblioteca = any esLibroFantasioso unaBiblioteca

esLibroFantasioso :: Libro -> Bool
esLibroFantasioso unLibro = esDe "Christopher Paolini" unLibro || esDe "Neil Gaiman" unLibro
```

Hagamos una observación 🔍 a estas soluciones:

```haskell
esLibroFantasioso unLibro = esDe "Christopher Paolini" unLibro || esDe "Neil Gaiman" unLibro

esFantasiosa :: Biblioteca -> Bool
esFantasiosa unaBiblioteca = any esLibroFantasioso unaBiblioteca

esFantasiosa' :: Biblioteca -> Bool
esFantasiosa' unaBiblioteca = any (esDe "Christopher Paolini") unaBiblioteca || any (esDe "Neil Gaiman") unaBiblioteca
```

Las funciones `esFantasiosa` y `esFantasiosa'` hacen exactamente lo mismo. Es lo mismo hacer `any (condicion1 || condicion2) lista` que `any condicion1 lista || any condicion2 lista`. Siempre vamos a preferir la primera solución ya que es más declarativa. 
Lo mismo ocurre también con `map` y `filter`: 
- `(map funcion1.map funcion2) lista` es lo mismo que `map (funcion1.funcion2) lista`
- `(filter condicion1.filter condicion2) lista` es lo mismo que `filter (condicion1 && condicion2) lista`

Sigamos con `nombreDeLaBiblioteca`:

```haskell
titulo (unTitulo, _, _) = unTitulo

nombreDeLaBiblioteca :: Biblioteca -> String
nombreDeLaBiblioteca unaBiblioteca = sinVocales . concatenatoriaDeTitulos $ unaBiblioteca


sinVocales :: String -> String
sinVocales unString = filter (not . esVocal) unString

esVocal :: Char -> Bool
esVocal unCaracter = elem unCaracter "aeiouAEIOUÁÉÍÓÚ"

concatenatoriaDeTitulos :: Biblioteca -> String
concatenatoriaDeTitulos unaBiblioteca = concatMap titulo unaBiblioteca
```

Recordá que como un `String` es una `[Char]` es lo mismo "aeiouAEIOUÁÉÍÓÚ" que ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O' , 'U', 'Á', 'É', 'Í', 'Ó' , 'Ú'] y es una forma mucho más fácil de escribirlo 😅. Si te quedó la duda de por qué repetimos las vocales en minúscula, mayúscula y con tildes, es para que matchee de las dos formas. 😄

¡Llegamos a la última función! La que nos dice si una biblioteca es ligera:


```haskell
esBibliotecaLigera :: Biblioteca -> Bool
esBibliotecaLigera unaBiblioteca = all esLecturaLigera unaBiblioteca

esLecturaLigera :: Libro -> Bool
esLecturaLigera unLibro = ((<= 40) . cantidadDePaginas) unLibro
```

Y de esa forma completamos el TP usando las herramientas que aprendiste hasta ahora. 👏

### Guardas

Ahora queremos saber de qué género es un libro. Eso va a depender de:

- Si tiene menos de 40 páginas, es un cómic. 💬
- Si el autor es Stephen King, es de terror. 🤡
- Si el autor es japonés, es un manga. 🗾
- En cualquier otro caso, no sabemos el género. 🤷‍♀️🤷‍♂️

Aprendimos cómo ver si un libro tiene cierta cantidad de páginas o si es de un autor en especial pero… ¿cómo averiguamos la nacionalidad de un autor? 😅 ¿Deberíamos agregar la nacionalidad del autor en cada libro? ¡Momento ✋! Sólo interesa saber quiénes son de Japón y, como en nuestra solución, el único autor japonés es *"Hajime Isayama"*, no tendría sentido agregar más información a cada libro. La forma más fácil de resolverlo es con una función:

```haskell
esDeAutorJapones :: Libro -> Bool
esDeAutorJapones = unLibro = elem (autor unLibro) autoresJaponenes

autoresJaponenes :: [String]
autoresJaponenes = ["Hajime Isayama"]

-- Si se llegaran a agregar otros autores japoneses, esta solución es más extensible.
```

¡Ya tenemos lo necesario para definir la función `genero`! 

```haskell
genero :: Libro -> String
genero unLibro
  | esDe "Stephen King" unLibro = "Terror"
  | (esJapones.autor) unLibro = "Manga"
  | esLecturaLigera unLibro = "Comic"
  | otherwise = "Indeterminado"
```

Recordá no olvidarte el `otherwise` cuando utilices guardas ya que es donde entra todo lo que no abarcan las guardas de encima de él. Y, ¿por qué pasa eso? 🤔 Resulta que `otherwise` es un sinónimo de `True`, por lo que siempre se va a poder entrar por esa condición cuando no se no cumplan ninguna de las demás. Utilizamos `otherwise` porque es más expresivo.



## Links Útiles

- [Video de la clase](https://drive.google.com/file/d/103Xo3_a1lmnJXl8K3WlCZdgzo6ayQwi-/view?usp=sharing)
- [Enunciado que hicimos en clase](https://docs.google.com/document/d/1YBTaPNfEd4s82UxmsRjYRZXCCA8-lQgFaLOEVbr0fGw/edit)
- [Código del TP](https://github.com/pdep-lunes/pdep-clases-2022/blob/master/Funcional/Clase04/src/Lib.hs)



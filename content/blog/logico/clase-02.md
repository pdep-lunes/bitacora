---
title: Novena clase
date: '2019-05-27'
description: 'Negación, unifiicación vs asignación, inversibilidad, forall'
tags: [logico, negacion, unificacion, inversibilidad, forall]
---

## Tarea para la clase que viene:

- Hacer hasta la lección 7 (inclusive) de [Mumuki](https://mumuki.io/pdep-utn/chapters/307-programacion-logica).
- Empezar con el TP grupal.

## Negación

Hasta ahora venimos definiendo predicados que trabajan con individuos. ¿Y qué pasa si queremos definir el predicado `noEsComic/1`? (Que nos dice si una lectura no es un cómic, por si no era obvio 😜). Lo haríamos de esta forma:

```prolog
noEsComic(UnaLectura) :-
  not(esComic(UnaLectura)).
```

Un momento ✋ ¿`not`? ¿Acá también? 😮 Sí, pero como habrás notado recibe como argumento otro predicado. ¿Te suena conocido? ¡Exacto! Es un predicado de **orden superior**, es decir, que va a recibir un predicado y nos responderá la negación de la respuesta de este. 😌

Veamos algunos ejemplos de cómo funciona con las siguientes consultas:

```prolog
?- noEsComic(watchmen).
false

?- noEsComic(fundacion).
true
```

¿Qué pasa si intentamos hacer una consulta con una variable anónima? 🤔 ¡Veamos!

```prolog
?- noEsComic(_)
false
```

¿Falso? Sí, porque recordemos que al hacer una consulta con una variable anónima estamos preguntando si existe un átomo (o número) que satisfaga como verdadera a la consulta.

Pero, ¿no es que hay consultas que responden verdadero a `not(esComic(Lectura))`? 😱
Si, pero `noEsComic/1` se satisface si `not(esComic(Lectura))` es verdadero. Entonces podemos deducir mediante unas consultas que:

```prolog
?- esComic(_)
true
%% Quiere decir que existe al menos una lectura que es comic, entonces:

?- not(esComic(_))
false
%% Estamos negando la consulta anterior, por lo tanto nos da false.
```

Por lo tanto, al hacer `noEsComic(_)`, estamos preguntando si no existe ninguna lectura que sea comic y eso nos da `false` ya que sí existen.

## Unificación vs Asignación

La _asignación_ (en este caso, para que sea más claro, la asignación destructiva) ocurre cuando se puede reemplazar el valor de una variable por otro valor. En funcional este concepto no existía y en Prolog, ¡tampoco! Lo que vamos a tener en este paradigma es la _unificación_.

¿Ehhh? 😵 Unificar es encontrar una sustitución capaz de igualar dos términos.
Por ejemplo, si hago la consulta:

```prolog
?- escribio(X, sandman)
X = neilGaiman
```

Lo que hace Prolog es buscar un consecuente, dentro de todas las cláusulas de nuestra base de conocimiento, que “unifique” con nuestra consulta.

## Inversibilidad

¿Esa palabra existe? No 😅. Pero decimos que un predicado es _inversible con respecto a un parámetro_ si admite hacer consultas individuales o existenciales sobre ese parámetro.
Además, un predicado es **totalmente inversible** si es inversible para todos sus parámetros.

Volviendo al predicado `noEsComic/1`, ¿qué pasa si intentamos hacer la siguiente consulta?

```prolog
?- noEsComic(X)
false
```

Pero esperá, ¿no era que si consultábamos con una variable, nos tendría que responder todas las consultas las cuales hagan verdadero al predicado? 🤔

Sí, pero como acabamos de ver, al preguntar `noEsComic(_)` nos retornaba false, indicando que “no existían consultas que hagan verdadero a ese predicado”, por lo tanto si consultamos con una variable, como no existen, retornara tambien false. 😌

¡Pero ya vimos que hay consultas verdaderas! ¿¿¿QUÉ PASA??? 😨

Oye, tranquilo viejo. Interpretemos lo que está pasando:
`noEsComic/1` nos responde si una lectura que no es cómic. Ahora, si vemos como está armado el predicado, veremos que hay una falla importante: la variable `UnaLectura` puede ser cualquier cosa, no necesariamente una lectura, y responderá verdadero. Por ejemplo:

```prolog
?- noEsComic(20).
true

?- noEsComic(soyCualquierCosaMenosUnaLectura).
true
```

Podemos ver que hay infinitas respuestas verdaderas para el predicado. Por eso Prolog no nos deja hacer una consulta con una variable: no sabe cuáles responderán verdadero, ya que son infinitas.
¿Y cómo solucionamos esto? 😬 Haciendo inversible el predicado. Es decir, ligar (unificar) nuestra variable a un predicado de la base de conocimiento que nos permita “generar” el universo con el que estamos trabajando.

```prolog
%% vamos a suponer que algo es una lectura si la escribió alguien %%
esLectura(UnaLectura) :-
	escribio(_, UnaLectura).

noEsComic(UnaLectura) :-
esLectura(UnaLectura),
not(esComic(UnaLectura)).
```

Entonces, ¿qué cosas pueden convertir a un predicado en NO inversible?

- Comparaciones ( `\=`, `<`, `=<`, `>=`, `>` )
- `not`
- forall

## Forall

Hasta ahora, estuvimos trabajando con **cuantificadores existenciales**, es decir, todas nuestras consultas eran del tipo:

```
∃x / p(x) => q(x)
```

Pero, sabemos que hay otro cuantificador, el _universal_. ¿Y cómo podemos trabajar con este cuantificador? 👀

Vamos a utilizar el predicado de orden superior `forall/2`:

```prolog
forall(antecedente, consecuente).
```

Para que el `forall` responda verdadero, tiene que ocurrir que **para todo antecedente que ocurra, su consecuente ocurre**.

Por ejemplo, al definir el predicado `soloEscribioComics/1` nos responde si todas las lecturas que alguien escribió son cómics.

```prolog
soloEscribioComics(Autore) :-
    %% Primero, hay que generar a la autora o autor! %%
    escribio(Autore, _),
    %% Y realizamos el forall %%
    forall(escribio(Autore, Lectura), esComic(Lectura)).
```

## Links útiles:

- [Negación](http://wiki.uqbar.org/wiki/articles/paradigma-logico---negacion.html)
- [Unificación vs asignación](http://wiki.uqbar.org/wiki/articles/unificacion-y-pattern-matching.html)
- [Inversibilidad](http://wiki.uqbar.org/wiki/articles/paradigma-logico---inversibilidad.html)
- [Generación](http://wiki.uqbar.org/wiki/articles/paradigma-logico---generacion.html)
- [Forall](http://wiki.uqbar.org/wiki/articles/paradigma-logico---existe-vs-para-todo.html)

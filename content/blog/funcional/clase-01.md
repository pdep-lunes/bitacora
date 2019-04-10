---
title: Primera clase
date: "2019-03-18"
description: "Primera clase de PdeP"
tags: [funcional]
---

## Links útiles

- **Grupo de Google:** [pdep-lunes-cursada@googlegroups.com](mailto:pdep-lunes-cursada@googlegroups.com)  
Suscribirse **obligatoriamente** enviando mail a [pdep-lunes-cursada+subscribe@googlegroups.com](mailto:pdep-lunes-cursada+subscribe@googlegroups.com)  
En este grupo estaremos mandando todas las novedades referidas al curso y también temas administrativos.
- **Wiki de PdeP:** Link [acá](http://wiki.uqbar.org/wiki/articles/paradigmas-de-programacion.html)  
En esta wiki vas a poder leer información teórica de los distintos temas de los tres paradigmas.
- **Página de Pdep:** En [esta página](http://pdep.com.ar) vas a poder encontrar muchos recursos como parciales, finales y apuntes como la guía de lenguajes.  
Además en la [página de nuestro curso](http://www.pdep.com.ar/Cursos/cursadas-anteriores/2019/2019-man-lunes) vas a poder encontrar el calendario de la cursada y la lista donde subiremos las notas de parciales y TPs.
- **Mumuki**: En Mumuki vas a poder encontrar muchos ejercicios de los 3 paradigmas y también poder guardar tu progreso a medidad que los vayas resolviendo.  
Podés entrar desde acá: [https://mumuki.io/pdep-utn](https://mumuki.io/pdep-utn)

## Info administrativa
La materia tiene 3 parciales.  

Para promocionar:
- 8 o más en los 3 parciales (con la posibilidad de recuperar 1 si te sacaste menos de 8)
- TPs aprobados

Para aprobar:
- 6 o más en los 3 parciales (hay 2 recuperatorios por cada parcial)
- TPs aprobados


## ¿Qué hacer antes de empezar?

- Crearse una cuenta en [Github](https://github.com). Vamos a estar usándolo durante todo este año para las entregas de TPs. (Creen su nombre de usuario a conciencia ya que muy probablemente lo sigan utilizando tanto en su vida académica como laboral 😜).
- Crearse una cuenta en Mumuki con el link de invitación que mandamos en la lista de mails.

## ¿Qué vimos hoy?

En esta materia vamos a ver 3 paradigmas y vamos a usar un lenguaje distinto para cada uno.
- ***Funcional:*** Vamos a usar Haskell.
- ***Lógico:*** Vamos a usar Prolog.
- ***Orientado a Objetos:*** Vamos a usar Wollok.

Vimos también los conceptos de:
 - **Declaratividad:**
   - Nos importa el ***qué*** y no el ***cómo***.
   - Ocultamos el detalle algorítmico.

 - **Expresividad:** los nombres que usamos en nuestro código deberían describir el propósito de nuestras variables, funciones, métodos, etc.

### Intro a funcional

Hoy vimos una introducción al paradigma funcional, con el cual trabajaremos esta primera mitad de cuatrimestre.


```haskell
triple numero = numero * 3
esMayor unNumero otroNumero = unNumero > otroNumero
```

Es ``triple`` y ``esMayor`` son dos funciones, y al igual que las funciones que usamos en análisis matemático respetan tener unicidad y existencia.

## Tarea
- Bajarse Haskell 💗 ([más info](http://www.pdep.com.ar/software/software-haskell))
- Bajarse un editor de texto para codear en Haskell. Por ejemplo:
  - [Sublime Text](https://www.sublimetext.com/3)
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Atom](https://atom.io/)
  - [Notepad ++](https://notepad-plus-plus.org/download/v7.6.6.html)

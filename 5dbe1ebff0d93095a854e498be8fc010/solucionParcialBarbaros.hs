import Text.Show.Functions
import Data.Char (toUpper, isUpper)

-- 1
data Barbaro = Barbaro {
  nombre :: String,
  fuerza :: Int,
  habilidades :: [String],
  objetos :: [Objeto]
} deriving Show

type Objeto = Barbaro -> Barbaro

-- accessors --
mapNombre :: (String -> String) -> Barbaro -> Barbaro
mapNombre f unBarbaro = unBarbaro { nombre = f . nombre $ unBarbaro }

mapFuerza :: (Int -> Int) -> Barbaro -> Barbaro
mapFuerza f unBarbaro = unBarbaro { fuerza = f . fuerza $ unBarbaro }

mapHabilidades :: ([String] -> [String]) -> Barbaro -> Barbaro
mapHabilidades f unBarbaro = unBarbaro { habilidades = f . habilidades $ unBarbaro }

mapObjetos :: ([Objeto] -> [Objeto]) -> Barbaro -> Barbaro
mapObjetos f unBarbaro = unBarbaro { objetos = f . objetos $ unBarbaro }

setObjetos :: [Objeto] -> Barbaro -> Barbaro
setObjetos unosObjetos unBarbaro = mapObjetos (const unosObjetos) unBarbaro
-- accessors --

dave :: Barbaro
dave = Barbaro "Dave" 100 ["tejer", "escribirPoesia"] [ardilla, libroPedKing]

-- 1.1
espada :: Int -> Objeto
espada pesoEspada = mapFuerza (+ pesoEspada * 2)

-- 1.2
amuletoMistico :: String -> Objeto
amuletoMistico = aprenderHabilidad

aprenderHabilidad :: String -> Objeto
aprenderHabilidad habilidad = mapHabilidades (habilidad :)

-- 1.3
varitaDefectuosa :: Objeto
varitaDefectuosa = aprenderHabilidad "hacerMagia" . setObjetos [varitaDefectuosa]

-- 1.4
ardilla :: Objeto
ardilla unBarbaro = unBarbaro

-- 1.5
cuerda :: Objeto -> Objeto -> Objeto
cuerda unObjeto otroObjeto = unObjeto . otroObjeto

-- 2
megafono :: Objeto
megafono unBarbaro = mapHabilidades amplificar unBarbaro

amplificar :: [String] -> [String]
amplificar unasHabilidades = [map toUpper . concat $ unasHabilidades]

megafonoBarbarico :: Objeto
megafonoBarbarico = cuerda ardilla megafono

libroPedKing :: Objeto
libroPedKing = undefined

-- 3
type Aventura = [Evento]
type Evento = Barbaro -> Bool

-- 3.1
invasionDeSuciosDuendes :: Evento
invasionDeSuciosDuendes unBarbaro = sabe "Escribir Poesía Atroz" unBarbaro

sabe :: String -> Barbaro -> Bool
sabe unaHabilidad unBarbaro = elem unaHabilidad . habilidades $ unBarbaro

-- 3.2
cremalleraDelTiempo :: Evento
cremalleraDelTiempo unBarbaro = not . tienePulgares . nombre $ unBarbaro

tienePulgares :: String -> Bool
tienePulgares "Faffy" = False
tienePulgares "Astro" = False
tienePulgares _       = True

-- 3.3
type Prueba = Barbaro -> Bool

ritualesDeFechorias :: [Prueba] -> Evento
ritualesDeFechorias pruebas unBarbaro = pasa any unBarbaro pruebas

-- 3.3.a
saqueo :: Prueba
saqueo unBarbaro = sabe "robar" unBarbaro && fuerza unBarbaro > 80

-- 3.3.b
gritoDeGuerra :: Prueba
gritoDeGuerra unBarbaro = poderDeGrito unBarbaro > largoDeHabilidades unBarbaro

largoDeHabilidades :: Barbaro -> Int
largoDeHabilidades unBarbaro = length . concat . habilidades $ unBarbaro

poderDeGrito :: Barbaro -> Int
poderDeGrito unBarbaro = (* 4) . length . objetos $ unBarbaro

-- 3.3.c
caligrafia :: Prueba
caligrafia unBarbaro = all (\unaHabilidad -> tieneMasDe3Vocales unaHabilidad && empiezaConMayuscula unaHabilidad) . habilidades $ unBarbaro

tieneMasDe3Vocales :: String -> Bool
tieneMasDe3Vocales = (> 3) . length . filter esVocal

esVocal :: Char -> Bool
esVocal char = elem char "AEIOUaeiou"

empiezaConMayuscula :: String -> Bool
empiezaConMayuscula unaPalabra = isUpper . head $ unaPalabra

sobrevivientes :: [Barbaro] -> Aventura -> [Barbaro]
sobrevivientes unosBarbaros unaAventura = filter (sobrevive unaAventura) unosBarbaros

sobrevive :: Aventura -> Barbaro -> Bool
sobrevive unaAventura unBarbaro = pasa all unBarbaro unaAventura

pasa unCriterio unBarbaro unasPruebas = unCriterio ($ unBarbaro) unasPruebas

-- 4
-- 4.a
sinRepetidos :: Eq a => [a] -> [a]
sinRepetidos [] = []
sinRepetidos (cabeza : cola)
  | elem cabeza cola = sinRepetidos cola
  | otherwise        = cabeza : sinRepetidos cola

-- 4.b
descendientes :: Barbaro -> [Barbaro]
descendientes unBarbaro = tail $ iterate descendiente unBarbaro

descendiente :: Barbaro -> Barbaro
descendiente = utilizarObjetos . mapNombre (++ "*") . mapHabilidades sinRepetidos

utilizarObjetos :: Barbaro -> Barbaro
utilizarObjetos unBarbaro = foldr ($) unBarbaro (objetos unBarbaro)
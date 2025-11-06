
-- Crear tabla authors
CREATE TABLE authors (
  id_author serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  surname varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  image varchar(255)
);
-- Crear tabla entries
CREATE TABLE entries (
  id_entry serial NOT NULL PRIMARY KEY, 
  title varchar(100) NOT NULL, 
  content text NOT NULL, 
  date date DEFAULT CURRENT_DATE,
  id_author int,
  category varchar(15),
  FOREIGN KEY (id_author) REFERENCES authors(id_author)
);
-- Insertar datos en tabla authors
INSERT INTO authors(name,surname,email,image)
VALUES
('Alejandru','Regex','alejandru@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/75.jpg'),
('Birja','Rivera','birja@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/60.jpg'),
('Alvaru','Riveru','alvaru@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/45.jpg'),
('Muchelle','Wuallus','muchelle@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/women/72.jpg'),
('Albertu','Henriques','albertu@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/33.jpg'),
('Guillermu','Develaweyer','guillermu@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/34.jpg'),
('Jabier','Hespinoza','jabier@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/35.jpg');
-- Insertar datos en tabla entries
INSERT INTO entries(title,content,id_author,category)
VALUES 
('Noticia: SOL en Madrid','Contenido noticia 1',(SELECT id_author FROM authors WHERE email='alejandru@thebridgeschool.es'),'Tiempo'),
('Noticia: Un panda suelto por la ciudad','El panda se comió todas las frutas de una tienda',(SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'),'Sucesos'),
('El rayo gana la champions','Victoria por goleada en la final de la champions',(SELECT id_author FROM authors WHERE email='albertu@thebridgeschool.es'),'Deportes'),
('Amanece Madrid lleno de arena','La calima satura Madrid de arena. Pérdidas millonarias',(SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'),'Sucesos'),
('Descubren el motor de agua','Fin de la gasolina. A partir de ahora usaremos agua en nuestros coches',(SELECT id_author FROM authors WHERE email='alvaru@thebridgeschool.es'),'Ciencia');
-- Buscar entries por email usuario
SELECT * FROM entries WHERE id_author=(SELECT id_author FROM authors WHERE email='alejandru@thebridgeschool.es');
-- Buscar datos por email de usuario y cruzar datos
SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
FROM entries AS e
INNER JOIN authors AS a
ON e.id_author=a.id_author
WHERE a.email='alejandru@thebridgeschool.es'
ORDER BY e.title;
-- Buscar datos por email de 2 usuarios y cruzar datos
SELECT entries.title,entries.content,entries.date,entries.category,authors.name,authors.surname,authors.image
FROM entries
INNER JOIN authors
ON entries.id_author=authors.id_author
WHERE authors.email='alejandru@thebridgeschool.es' OR authors.email='alvaru@thebridgeschool.es' OR authors.email='albertu@thebridgeschool.es'
ORDER BY entries.title;
-- Actualizar datos de una entrada
UPDATE entries
	SET content='Back is back', date='2024-06-17', id_author=(SELECT id_author FROM authors WHERE email='alvaru@thebridgeschool.es'), category='Software'
	WHERE title='Estamos de Lunes de Back';






---Primero, vamos a modificar la BBDD para que no se puedan insertar entries repetidas por título (Hay que alterar algo en la tabla)
ALTER TABLE entries
ADD CONSTRAINT unique_title UNIQUE (title);

---1.Modificar la query SQL para que me devuelva una respuesta con los datos del autor y sin ID de la entry:
SELECT 
  e.title,
  e.content,
  e.date,
  e.category,
  a.name,
  a.surname,
  a.email AS email_author,
  a.image
FROM entries e
JOIN authors a ON e.id_author = a.id_author;


---2.Devuelve solo las entries de un autor concreto, buscando por su email.

SELECT 
  e.title, e.content, e.date, e.category,
  a.name, a.surname, a.email AS email_author, a.image
FROM entries e
JOIN authors a ON e.id_author = a.id_author
WHERE a.email = $1;

---3.Modifica una entry por completo con nuevos datos y retorna un status 200. Buscar por título para editar entry.

UPDATE entries
SET content = $1, category = $2, date = $3
WHERE title = $4;


---4.Borra una entry y retorna un status 200. Búsqueda por título de entry para borrar. 

DELETE FROM entries WHERE title = $1;


---5.Retorna un objeto con los datos de todos los autores. Retorna un status 200.

SELECT * FROM authors;


---6.[GET] http://localhost:3000/api/authors?email=alejandru@thebridgeschool.es Retorna un objeto con los datos del autor buscado. Retorna un status 200 Payload:

SELECT * FROM authors WHERE email = $1;


---7.[POST] http://localhost:3000/api/authors/ Se envía por POST los datos del autor a crear y retorna un status 201. Payload:

INSERT INTO authors (name, surname, email, image)
VALUES ($1, $2, $3, $4);



---8. [PUT] http://localhost:3000/api/authors/ Actualiza los datos de un autor y retorna un status 200. Payload:

UPDATE authors
SET name = $1, surname = $2, image = $3
WHERE email = $4;


---9. [DELETE] http://localhost:3000/api/authors/ Borra un autor y retorna un status 200. Búsqueda por email. Payload:

DELETE FROM authors WHERE email = $1;




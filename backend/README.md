Run with : 
~~~sh
docker-compose up --build
~~~

USAGE

http://localhost:3000/api/users/signup
~~~
Body 
{
  "username" : "oteuusername",
  "password" : "atuapasswordcommaisde8chars",
  "full_name" : "oteunomecompleto",
  "email" : "umemail@valido.com"
}
~~~




http://localhost:3000/api/users/login

{
  "username" : "oteuusername",
  "password" : "atuapasswordcommaisde8chars"
}
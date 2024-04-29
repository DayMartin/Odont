Projeto para Dentistas locais

<img src="https://img.shields.io/badge/JAVASCRIPT-black?style=for-the-badge&logo=JavaScript&logoColor=F7DF1E"/>
<img src="https://img.shields.io/npm/v/npm.svg?logo=nodedotjs"/>

Pacotes para o back: 
npm install
npm install mysql2
npm install cors
npm install dotenv

Iniciar o back: npm start

<img src="https://img.shields.io/badge/mysql-blue?style=for-the-badge&logo=mysql5&logoColor=4479A1"/>

Necessário criar e configurar conexão com o banco de dados MYSQL

Atualização dos pacotes: 

sudo apt update
sudo apt upgrade

Instalar o servidor MySQL no seu sistema:
sudo apt install mysql-server

Inicialização do serviço MySQL após a instalação:
sudo systemctl start mysql

Verificar se a instalação funcionou mostrando a versão do MySQL instalada
mysql --version

Você pode configurar o MySQL para iniciar automaticamente quando o seu sistema linux iniciar ( Isto é opcional )
sudo systemctl enable mysql

Configuração MySQL:
sudo mysql_secure_installation

Etapas de configuração

Etapa1: Enter current password for root (enter for none):

Se você nunca definiu uma senha para o usuário root do MySQL, pressione “Enter”
Se você já definiu uma senha, digite a senha tual do usuário root e pressione “Enter”

Etapa2: Set root password? [Y/n]
Pressione “Y” ou “y” do seu teclado apra definir uma nova senha para o usuário root
Em seguida, você será solicitado a digitar a nova senha e confirmá-la

Etapa3: Remove anonymus users? [Y/n]
Pressione “Y” ou “y” para remover as contas de usuário anônimas (recomendado)

Etapa4: Disallow root login remotely? [Y/n]
Pressione “Y” ou “y” para desativar o login do usuário root remotamente ( recomendado )

Etapa5: Remove test database end access to it? [Y/n]
Pressione “Y” ou “y” para remover a base de dados de teste ( recomendado )

Etapa6: Reload privilege tables now [Y/n]
Pressione “Y” ou “y” para recarregar as tabelas de privilégios e aplicar as alterações de configuração.


Se você quiser modificar a senha definida ou se você não lembra a senha definida:
Entre como Root

mysql -u root -p
ou
sudo mysql -u root

Com este comando abaixo você atualiza a senha do MySQL:

ALTER USER ‘root’@’localhost’ IDENTIFIED WITH ‘mysql_native_password’ BY ‘coloque-aqui-sua-nova-senha‘;

Digite este comando para atualizar os privilégios:

FLUSH PRIVILEGES;

E saia do MySQL:

EXIT;

BÔNUS ++

Para saber a porta que o MySQL está rodando:

SHOW VARIABLES LIKE

<img src="https://img.shields.io/badge/mysql-blue?style=for-the-badge&logo=mysql5&logoColor=4479A1"/>
<img src="https://img.shields.io/badge/JAVASCRIPT-black?style=for-the-badge&logo=JavaScript&logoColor=F7DF1E"/>
<img src="https://img.shields.io/npm/v/npm.svg?logo=nodedotjs"/>

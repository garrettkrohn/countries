<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230404154826 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE country_country_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE region_region_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE country (country_id INT NOT NULL, region_id INT NOT NULL, name VARCHAR(255) NOT NULL, flag VARCHAR(255) NOT NULL, capital VARCHAR(255) NOT NULL, area NUMERIC(15, 2) NOT NULL, population INT NOT NULL, PRIMARY KEY(country_id))');
        $this->addSql('CREATE INDEX IDX_5373C96698260155 ON country (region_id)');
        $this->addSql('CREATE TABLE region (region_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(region_id))');
        $this->addSql('ALTER TABLE country ADD CONSTRAINT FK_5373C96698260155 FOREIGN KEY (region_id) REFERENCES region (region_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE country_country_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE region_region_id_seq CASCADE');
        $this->addSql('ALTER TABLE country DROP CONSTRAINT FK_5373C96698260155');
        $this->addSql('DROP TABLE country');
        $this->addSql('DROP TABLE region');
    }
}

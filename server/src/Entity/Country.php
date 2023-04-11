<?php

namespace App\Entity;

use App\Repository\CountryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CountryRepository::class)]
class Country
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column]
    private int $country_id;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(length: 255)]
    private string $flag;

    #[ORM\Column(length: 255)]
    private string $capital;

    #[ORM\Column(type: Types::DECIMAL, precision: 15, scale: 2)]
    private string $area;

    #[ORM\Column]
    private int $population;

    #[ORM\ManyToOne(inversedBy: 'countries')]
    #[ORM\JoinColumn(name: 'region_id', referencedColumnName: 'region_id', nullable: false)]
    private Region $Region;

    public function getCountryId(): int
    {
        return $this->country_id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFlag(): string
    {
        return $this->flag;
    }

    public function setFlag(string $flag): self
    {
        $this->flag = $flag;

        return $this;
    }

    public function getCapital(): string
    {
        return $this->capital;
    }

    public function setCapital(string $capital): self
    {
        $this->capital = $capital;

        return $this;
    }

    public function getArea(): string
    {
        return $this->area;
    }

    public function setArea(string $area): self
    {
        $this->area = $area;

        return $this;
    }

    public function getPopulation(): int
    {
        return $this->population;
    }

    public function setPopulation(int $population): self
    {
        $this->population = $population;

        return $this;
    }

    public function getRegion(): region
    {
        return $this->Region;
    }

    public function setRegion(?region $Region): self
    {
        $this->Region = $Region;

        return $this;
    }
}

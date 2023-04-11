<?php

namespace App\Service;

use App\Entity\Country;
use App\Entity\Region;
use App\Repository\CountryRepository;
use App\Repository\RegionRepository;
use App\Service\AbstractMultiTransformer;
use CountryDto;
use CreateCountryDto;
use Doctrine\ORM\EntityManagerInterface;

class CountryService extends AbstractMultiTransformer
{

    private RegionRepository $regionRepository;
    private EntityManagerInterface $entityManager;
    private CountryRepository $countryRepository;

    /**
     * @param RegionRepository $regionRepository
     * @param EntityManagerInterface $entityManager
     * @param CountryRepository $countryRepository
     */
    public function __construct(RegionRepository $regionRepository, EntityManagerInterface $entityManager, CountryRepository $countryRepository)
    {
        $this->regionRepository = $regionRepository;
        $this->entityManager = $entityManager;
        $this->countryRepository = $countryRepository;
    }


    /**
     * @param CreateCountryDto $createCountryDto
     * @return CountryDto
     */
    public function addCountries(CreateCountryDto $createCountryDto): CountryDto
    {
        $country = new Country();
        $country->setName($createCountryDto->getName());
        $country->setFlag($createCountryDto->getFlag());
        $country->setCapital($createCountryDto->getCapital());
        $country->setArea($createCountryDto->getArea());
        $country->setPopulation($createCountryDto->getPopulation());

        $regionSearch = $this->regionRepository->findOneBy(['name' => $createCountryDto->getRegion()]);
        if ($regionSearch) {
            $country->setRegion($regionSearch);
        } else {
            $newRegion = new Region();
            $newRegion->setName($createCountryDto->getRegion());
            $country->setRegion($newRegion);
            $this->entityManager->persist($newRegion);
        }

        $this->entityManager->persist($country);
        $this->entityManager->flush();

        return $this->transformFromObject($country);
    }

    /**
     * @return CountryDto[]
     */
    public function getAllcountries(): iterable
    {
        $allCountries = $this->countryRepository->findAll();
        return $this->transformFromObjects($allCountries);
    }

    /**
     * @param Country $object
     * @return CountryDto
     */
    public function transformFromObject($object): CountryDto
    {
        $dto = new CountryDto();
        $dto->setCountryId($object->getCountryId());
        $dto->setName($object->getName());
        $dto->setFlag($object->getFlag());
        $dto->setCapital($object->getCapital());
        $dto->setArea($object->getArea());
        $dto->setPopulation($object->getPopulation());
        $dto->setRegion($object->getRegion()->getName());

        return $dto;
    }
}
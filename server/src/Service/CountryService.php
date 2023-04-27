<?php

namespace App\Service;

use App\Entity\Country;
use App\Entity\Region;
use App\Repository\CountryRepository;
use App\Repository\RegionRepository;
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
    public function __construct(RegionRepository  $regionRepository, EntityManagerInterface $entityManager,
                                CountryRepository $countryRepository)
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
        //creates the country and converts the create country dto
        $country = new Country();
        $country->setName($createCountryDto->getName());
        $country->setFlag($createCountryDto->getFlag());
        $country->setCapital($createCountryDto->getCapital());
        $country->setArea($createCountryDto->getArea());
        $country->setPopulation($createCountryDto->getPopulation());

        //this is a great example of how doctrine can make nested objects easy to work with.  This portion of the
        //function will check if there is a region with the name in the creat country dto.  If there is, it will
        //simply add it to the country entity.  If one doesn't exist, it will create one then add it
        $regionSearch = $this->regionRepository->findOneBy(['name' => $createCountryDto->getRegion()]);
        if ($regionSearch) {
            $country->setRegion($regionSearch);
        } else {
            $newRegion = new Region();
            $newRegion->setName($createCountryDto->getRegion());
            $country->setRegion($newRegion);
            $this->entityManager->persist($newRegion);
        }

        // the entity manager persist command stages the changed
        $this->entityManager->persist($country);
        // the flush command adds it to the database.  You can do multiple persists and one flush when you're ready
        // to send it to the database
        $this->entityManager->flush();

        return $this->transformFromObject($country);
    }

    /** Every controller that extends the AbstractMultiController needs this function which takes in the Country
     * entity and returns a CountryDto.  This function will also be used by the transformFromObjects function.
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

    /**
     * @return CountryDto[]
     */
    public function getAllcountries(): iterable
    {
        $allCountries = $this->countryRepository->findAll();
        return $this->transformFromObjects($allCountries);
    }
}
<?php

namespace App\Controller;

use App\Exception\InvalidRequestDataException;
use App\Serialization\SerializationService;
use App\Service\CountryService;
use CreateCountryDto;
use JsonException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CountryController extends ApiController
{
    private CountryService $countryService;
    private SerializationService $serializationService;

    public function __construct(CountryService $countryService, SerializationService $serializationService)
    {
        parent::__construct($serializationService);
        $this->countryService = $countryService;
    }

    /** the route command defines what the api call needs to be, so for this function it would be
     * localhost:8000/api/countries as a POST request and the body will come in as a $request
     * @throws JsonException
     * @throws InvalidRequestDataException
     */
    #[Route('api/countries', methods: ('POST'))]
    public function setcountries(Request $request): Response
    {
        // this block will define the type for $dto on line 35
        /** @var CreateCountryDto $dto */
        // validates the dto against the class that you pass in as the second argument
        $dto = $this->getValidatedDto($request, CreateCountryDto::class);
        // returns the object as a json.
        return $this->json($this->countryService->addCountries($dto));
    }

    #[Route('api/countries', methods: ('GET'))]
    public function getCountries(): Response
    {
        return $this->json($this->countryService->getAllCountries());
    }
}
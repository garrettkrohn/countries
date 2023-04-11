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

    /**
     * @throws JsonException
     * @throws InvalidRequestDataException
     */
    #[Route('api/countries', methods: ('POST'))]
    public function setcountries(Request $request): Response
    {
        /** @var CreateCountryDto $dto */
        $dto = $this->getValidatedDto($request, CreateCountryDto::class);
        return $this->json($this->countryService->addCountries($dto));
    }

    #[Route('api/countries', methods: ('GET'))]
    public function getCountries(): Response
    {
        return $this->json($this->countryService->getAllCountries());
    }
}
<?php

namespace App\Controller;

use App\Exception\InvalidRequestDataException;
use App\Serialization\SerializationService;
use App\Service\UserService;
use CreateUserDto;
use JsonException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends ApiController
{

    private UserService $userService;
    private SerializationService $serializationService;

    public function __construct(UserService $userService, SerializationService $serializationService)
    {
        parent::__construct($serializationService);
        $this->userService = $userService;
    }

    /**
     * @throws JsonException
     * @throws InvalidRequestDataException
     */
    #[Route('api/users', methods: ('POST'))]
    public function createUser(Request $request): Response
    {
        /** @var CreateUserDto $dto */
        $dto = $this->getValidatedDto($request, CreateUserDto::class);
        return $this->json($this->userService->createUser($dto));
    }

    #[Route('api/users', methods: ('GET'))]
    public function getUsers(): Response
    {
        return $this->json($this->userService->getUsers());
    }


}
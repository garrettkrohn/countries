<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use CreateUserDto;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use UserDto;

class UserService extends AbstractMultiTransformer
{
    private EntityManagerInterface $entityManager;
    private UserRepository $userRepository;
    private LoggerInterface $logger;

    /**
     * @param EntityManagerInterface $entityManager
     * @param UserRepository $userRepository
     * @param LoggerInterface $logger
     */
    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->logger = $logger;
    }


    public function createUser(CreateUserDto $createUserDto): UserDto
    {
        $newUser = new User();
        $newUser->setUsername($createUserDto->getUsername());
        $newUser->setBackgroundColor($createUserDto->getBackgroundColor());
        $this->entityManager->persist($newUser);
        $this->entityManager->flush();

        $createdUser = $this->userRepository->findOneBy(['username' => $createUserDto->getUsername()]);


        return $this->transformFromObject($createdUser);
    }

    /**
     * @param User $object
     * @return UserDto
     */
    public function transformFromObject($object): UserDto
    {
        $dto = new UserDto();
        $dto->setUserId($object->getUserId());
        $dto->setUsername($object->getUsername());
        $dto->setBackgroundColor($object->getBackgroundColor());

        return $dto;
    }

    /**
     * @return UserDto[]
     */
    public function getUsers(): iterable
    {
        $allUsers = $this->userRepository->findAll();
        return $this->transformFromObjects($allUsers);
    }


}
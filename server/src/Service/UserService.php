<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use CreateUserDto;
use Doctrine\ORM\EntityManagerInterface;
use UserDto;

class UserService extends AbstractMultiTransformer
{
    private EntityManagerInterface $entityManager;
    private UserRepository $userRepository;

    /**
     * @param EntityManagerInterface $entityManager
     * @param UserRepository $userRepository
     */
    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
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
     * @return UserDto[]
     */
    public function getUsers(): iterable
    {
        $allUsers = $this->userRepository->findAll();
        return $this->transformFromObjects($allUsers);
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


}
import UserRepository from '../module.users/repository.users.js';
import UserService from '../module.users/service.users.js';
import UserController from '../module.users/controller.users.js';

import MissionRepository from '../module.missions/repository.missions.js'
import MissionService from '../module.missions/service.missions.js'
import MissionController from '../module.missions/controller.missions.js'

import CandidaturesRepository from '..//module.candidatures/repository.candidatures.js'
import CandidatureService from '../module.candidatures/service.candidatures.js';
import CandidatureController from '../module.candidatures/controller.candidatures.js';



export function initDependencies(pool){
    const userRepository = new UserRepository(pool);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

const missionRepository = new MissionRepository(pool);
const missionService = new MissionService(missionRepository);
const missionController = new MissionController(missionService)

const candidaturesRepository = new CandidaturesRepository(pool)
const candidatureService =new CandidatureService(candidaturesRepository)
const candidaturesController = new CandidatureController(candidatureService)

  return{
    userController,
    missionController,
    candidaturesController
  }
}
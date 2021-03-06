'use strict';


// Characters controller
angular.module('characters').controller('CharactersController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Characters', 'Guilds',
 function ($http, $scope, $stateParams, $location, Authentication, Characters, Guilds) {
        $scope.authentication = Authentication;

        // Create new Character
        $scope.create = function () {

            // Create new Character object
            var character = new Characters({
                name: this.name,
                realm: this.realm
            });

            //api call
            $http.jsonp('https://us.api.battle.net/wow/character/' + character.realm + '/' + character.name + '?fields=fields=stats%2Citems%2Cguild&locale=en_US&jsonp=JSON_CALLBACK&apikey=77qnvbc7kem6n7ukch6yb89ygh5ds7se')
                .success(function (data) {
                    console.log(data);
                    ///////////////////////////functions
                    //calculate race to save into string
                    function calcRace(race) {
                        var possibleRaces = {
                            1: 'Human',
                            2: 'Orc',
                            3: 'Dwarf',
                            4: 'Night Elf',
                            5: 'Undead',
                            6: 'Tauren',
                            7: 'Gnome',
                            8: 'Troll',
                            9: 'Goblin',
                            10: 'Blood Elf',
                            11: 'Draeni',
                            22: 'Worgen',
                            25: 'Pandaren'
                        };
                        character.race = possibleRaces[race];
                    }

                    //calculate class to save into string
                    function calcClass(role) {
                        var possibleClasses = {
                            1: 'Warrior',
                            2: 'Paladin',
                            3: 'Hunter',
                            4: 'Rogue',
                            5: 'Priest',
                            6: 'Death Knight',
                            7: 'Shaman',
                            8: 'Mage',
                            9: 'Warlock',
                            10: 'Monk',
                            11: 'Druid'
                        };
                        character.class = possibleClasses[role];
                    }

                    function createThumb(thumb) {
                        //generate thumbnail
                        character.thumbnail = 'http://us.battle.net/static-render/us/' + thumb;
                    }

                    //save info into model
                    character.achievements = data.achievementPoints;
                    character.level = data.level;
                    createThumb(data.thumbnail);
                    calcClass(data.class);
                    calcRace(data.race); 
                    character.guild = data.guild.name;

                    //setup the new guild
                    //fetch guild data
                    $http.jsonp('https://us.api.battle.net/wow/guild/' + data.guild.realm + '/' + data.guild.name + '?fields=members&locale=en_US&jsonp=JSON_CALLBACK&apikey=77qnvbc7kem6n7ukch6yb89ygh5ds7se')
                        .success(function (guildData) {
                            var guild = new Guilds({
                                name: data.guild.name,
                                realm: data.guild.realm,
                                level: guildData.level,
                                achievements: guildData.achievementPoints,
                                emblem : guildData.emblem,
                                members : guildData.members,
                                membersNum : guildData.members.length,
                            });
                            guild.$save();
                        });

                    // Redirect after save
                    character.$save(function (response) {
                        $location.path('characters/' + response._id);
                        // Clear form fields
                        $scope.name = '';
                        $scope.realm = '';


                    }, function (errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                })
                .error(function (data, status, headers, config) {
                    $scope.error = 'Bad Request.  Check character and realm names.  Make sure you are using the realm the character was created in, not necessarily where it lives now.';
                    $scope.name = '';
                    $scope.realm = '';
                    character.$remove();
                });

            //save new character model into  current user model

        };

        // Remove existing Character
        $scope.remove = function (character) {
            if (character) {
                character.$remove();
                for (var i in $scope.characters) {
                    if ($scope.characters[i] === character) {
                        $scope.characters.splice(i, 1);
                    }
                }
            } else {
                $scope.character.$remove(function () {
                    $location.path('characters');
                });
            }
        };

        // Update existing Character
        $scope.update = function () {
            var character = $scope.character;
            character.$update(function () {
                $location.path('characters/' + character._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Characters
        $scope.find = function () {
            if ($scope.authentication.user) {
                $scope.characters = Characters.query();
                
                Guilds.query().$promise.then(function (res) {
                    $scope.guilds = res;
                });
                
                console.log($scope);
            }
        };

        // Find existing Character
        $scope.findOne = function () {
            $scope.character = Characters.get({
                characterId: $stateParams.characterId
            });
        };
 }
]);
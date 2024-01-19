#include <iostream>
#include <string>
 
#include "enemy.h"
 
int main(int argc, char** argv){
	Enemy goblin("goblin", 5, .25f);
	Enemy troll("troll", 44 , .5f);
 
	std::cout << goblin.getName() << std::endl;
	std::cout << troll.getName() << std::endl;

	if (goblin < troll){std::cout << troll.getHp() << std::endl;}
}

#include <iostream>
#include <string>
 
#include "enemy.h"
 
int main(int argc, char** argv){
	Enemy goblin("goblin", 5, .75f);
	Enemy troll("troll", 44 , .5f);

	std::cout << goblin.getName() << std::endl;
	std::cout << troll.getName() << std::endl;

	if (goblin < troll){std::cout << "the toll has more hp than the goblin" << std::endl;}
	else{std::cout << "this goblin has more hp than than the troll" << std::endl;}
	

	if(goblin > troll){std::cout << "that is one healthy goblin compared to that troll" << std::endl;}
	else{std::cout << "this goblin is more fragile than the troll" << std::endl;}

	if(goblin == troll){std::cout << "the goblin and the troll have the same hp";}
	
	std::cout << goblin << std::endl;

} 
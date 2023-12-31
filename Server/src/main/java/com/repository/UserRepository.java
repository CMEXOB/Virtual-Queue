package com.repository;

import com.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {

    @Query("select u from User u where u.name=?1")
    User getUserById(String id);

    @Query("select u from User u where not u.number = 0 order by u.number")
    List<User> getQueue();

    @Query("select u from User u where not u.number = 0 and u.number in (select max(u.number) from User u where not u.number = 0)")
    User getLast();

    @Query("select u from User u where not u.number = 0 and u.number > ?1 order by u.number")
    List<User> getQueueAfter(Long number);
}

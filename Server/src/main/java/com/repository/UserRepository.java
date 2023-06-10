package com.repository;

import com.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {

    @Query("select u from User u where u.name=?1")
    User getUserById(String id);

    @Query("select u from User u where not u.number is null order by u.number")
    List<User> getQueue();

    @Query("select max(u.number) from User u where not u.number is null")
    List<User> getLast();
}

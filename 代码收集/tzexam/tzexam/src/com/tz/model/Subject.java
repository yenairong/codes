/**
 * Project Name:tzexam
 * File Name:Subject.java
 * Package Name:com.tz.model
 * Date:2015年10月23日下午10:41:34
 * Copyright (c) 2015, chenzhou1025@126.com All Rights Reserved.
 *
 */

package com.tz.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * ClassName:Subject <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2015年10月23日 下午10:41:34 <br/>
 * 
 * @author Administrator
 * @version
 * @since JDK 1.6
 * @see
 */
@Entity
@Table(name = "tz_subject")
public class Subject implements java.io.Serializable {
	// 主键
	private Integer id;
	// 学科名称
	private String name;
	// 学科描述
	private String description;
	// 创建时间
	private Date createTime;
	// 删除状态(0未删除1删除)
	private Integer isDelete;
	// 0未发布1发布
	private Integer status;
	// 更新时间
	private Date updateTime;
	// 用户id
	private Integer userId;
	// 更新用户
	private Integer upUserId;

	public Subject() {
		super();
	}

	public Subject(Integer id, String name, String description,
			Date createTime, Integer isDelete, Integer status, Date updateTime,
			Integer userId, Integer upUserId) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.createTime = createTime;
		this.isDelete = isDelete;
		this.status = status;
		this.updateTime = updateTime;
		this.userId = userId;
		this.upUserId = upUserId;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "name", length = 100)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Lob
	@Column(name = "description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "create_time")
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "is_delete", length = 1)
	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	@Column(name = "status", length = 1)
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "update_time")
	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@Column(name = "user_id")
	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Column(name = "up_user_id")
	public Integer getUpUserId() {
		return upUserId;
	}

	public void setUpUserId(Integer upUserId) {
		this.upUserId = upUserId;
	}
}

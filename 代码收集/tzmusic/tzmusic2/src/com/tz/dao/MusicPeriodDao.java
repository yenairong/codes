package com.tz.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.hibernate.Hibernate;
import org.hibernate.metamodel.binding.HibernateTypeDescriptor;
import org.hibernate.tool.hbm2ddl.SchemaExport.Type;
import org.hibernate.validator.jtype.Types;
import org.springframework.stereotype.Repository;

import com.tz.model.TzMusicPeriod;
import com.tz.util.TmStringUtils;

@Repository
@Transactional
public class MusicPeriodDao  extends BaseDao<TzMusicPeriod,Integer> {

	
	
	/**
	 * 查询期刊列表
	 * 方法名：findPeriods
	 * 创建人：xuchengfei 时间：2015年3月29日-上午12:03:01 
	 * @param keyword
	 * @param typeId
	 * @return List<TzMusicPeriod>
	 * @exception 
	 * @since  1.0.0
	 */
	public List<TzMusicPeriod> findPeriods(String keyword,Integer typeId){
		String hql = "FROM TzMusicPeriod where is_delete= 0  ";
		StringBuilder builder = new StringBuilder();
		builder.append(hql);
		Map<String,Object> map = new HashMap<String,Object>();
		if(TmStringUtils.isNotEmpty(keyword)){
			builder.append(" and title LIKE '%"+keyword+"%'");
		}
		if(typeId!=null){
			builder.append(" and musicType.id = "+typeId);
		}
		List<TzMusicPeriod> musicPeriods = getSession().createQuery(hql).list();
		return musicPeriods;
		
//		DetachedCriteria criteria = DetachedCriteria.forClass(TzMusicPeriod.class);
//		if(TmStringUtils.isNotEmpty(keyword)){
//			criteria.add(Restrictions.like("title", keyword,MatchMode.ANYWHERE));
//		}
//		if(typeId!=null){
//			criteria.add(Restrictions.eq("musicType.id", typeId));
//		}
//		criteria.add(Restrictions.eq("isDelete", 0));
//		return criteria.getExecutableCriteria(getSession()).list();
	}
	
	
	/**
	 * 查询期刊 方法名：getMusicPeriod 创建人：xuchengfei 时间：2015年3月18日-上午12:34:16
	 * 
	 * @param id
	 * @return TzMusicPeriod
	 * @exception
	 * @since 1.0.0
	 */
	public TzMusicPeriod getMusicPeriod(Integer id) {
		// TzMusicPeriod period = (TzMusicPeriod) getSession().load(
		// TzMusicPeriod.class, id);
		String hql = "from TzMusicPeriod where id = ? and status = 1 and isDelete = 0";
		return (TzMusicPeriod) getSession().createQuery(hql).setInteger(0, id)
				.uniqueResult();
	}
	
	
	
	/**
	 * 保存期刊
	 * 方法名：save
	 * 创建人：xuchengfei 时间：2015年3月26日-上午12:56:37 
	 * @param period
	 * @return TzMusicPeriod
	 * @exception 
	 * @since  1.0.0
	 */
	public TzMusicPeriod save(TzMusicPeriod period){
		try {
			getSession().save(period);
			return period;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 期刊修改
	 * 方法名：update
	 * 创建人：xuchengfei 时间：2015年3月26日-下午9:40:22 
	 * @param period
	 * @return TzMusicPeriod
	 * @exception 
	 * @since  1.0.0
	 */
	public TzMusicPeriod update(TzMusicPeriod period){
		try {
			updateDefault(period);
			return period;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}

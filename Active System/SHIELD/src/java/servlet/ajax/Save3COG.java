/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.MissionDAO;
import entity.COG;
import entity.EEntity;
import entity.Excerpt;
import entity.IntTuple;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Dan Torres
 */
public class Save3COG extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Save3COG</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Save3COG at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        int editorID = (int)session.getAttribute("userID");
        int missionID = (int)session.getAttribute("missionID");
        
        String nodeJSON = request.getParameter("nodesJSON");
        String edgeJSON = request.getParameter("edgesJSON");
        JSONArray ccArr = new JSONArray(request.getParameter("cc"));
        JSONArray crArr = new JSONArray(request.getParameter("cr"));
        JSONArray cvArr = new JSONArray(request.getParameter("cv"));
        JSONArray relCRArr = new JSONArray(request.getParameter("crArr"));
        JSONArray relRVArr = new JSONArray(request.getParameter("rvArr"));
        
        ArrayList<EEntity> ccList = new ArrayList<EEntity>();
        ArrayList<EEntity> crList = new ArrayList<EEntity>();
        ArrayList<EEntity> cvList = new ArrayList<EEntity>();
        ArrayList<IntTuple> relCRList = new ArrayList<IntTuple>();
        ArrayList<IntTuple> relRVList = new ArrayList<IntTuple>();
        for(Object obj : ccArr){
                EEntity cc = new EEntity();
                cc.setId((int)obj);
                ccList.add(cc);
        }
        for(Object obj : crArr){
                EEntity cc = new EEntity();
                cc.setId((int)obj);
                crList.add(cc);
        }
        for(Object obj : cvArr){
                EEntity cc = new EEntity();
                cc.setId((int)obj);
                cvList.add(cc);
        }
        for(Object obj : relCRArr){
                IntTuple it = new IntTuple();
                JSONObject jsob = new JSONObject(obj.toString());
                it.setX(jsob.getInt("cc"));
                it.setY(jsob.getInt("cr"));
                relCRList.add(it);
        }
        for(Object obj : relRVArr){
                IntTuple it = new IntTuple();
                JSONObject jsob = new JSONObject(obj.toString());
                it.setX(jsob.getInt("cr"));
                it.setY(jsob.getInt("cv"));
                relRVList.add(it);
        }
        
        
        COG cog = new COG();
        cog.setNodeJSON(nodeJSON);
        cog.setEdgeJSON(edgeJSON);
        cog.setCcList(ccList);
        cog.setCrList(crList);
        cog.setCvList(cvList);
        cog.setRelCRList(relCRList);
        cog.setRelRVList(relRVList);
        
        cog.setMissionID(missionID);
        
        MissionDAO msonDAO = new MissionDAO();
        

        boolean success = msonDAO.AddCOG(cog);
        
        int missionStatus = (int)session.getAttribute("missionStatus");
        if(missionStatus == 3 && success){
            missionStatus = msonDAO.AdvanceMissionStatus(missionStatus);
            session.setAttribute("missionStatus", missionStatus);
        }
        
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("<strong>Center of Gravity Analysis</strong> has been <strong>saved.</strong>");
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
